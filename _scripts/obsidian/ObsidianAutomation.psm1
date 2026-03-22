Set-StrictMode -Version Latest

function Get-ObsidianVaultRoot {
    [CmdletBinding()]
    param()

    $root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
    return $root.Path
}

function Get-ObsidianAutomationConfig {
    [CmdletBinding()]
    param(
        [string]$VaultRoot = (Get-ObsidianVaultRoot),
        [string]$ApiKey,
        [string]$BaseUri
    )

    $configPath = Join-Path $VaultRoot ".obsidian\plugins\obsidian-local-rest-api\data.json"
    if (-not (Test-Path $configPath -PathType Leaf)) {
        throw "Local REST API config not found at '$configPath'."
    }

    $settings = Get-Content -Raw $configPath | ConvertFrom-Json

    $effectiveApiKey = if ($ApiKey) {
        $ApiKey
    } elseif ($env:OBSIDIAN_REST_API_KEY) {
        $env:OBSIDIAN_REST_API_KEY
    } elseif ($env:OBSIDIAN_LOCAL_REST_API_KEY) {
        $env:OBSIDIAN_LOCAL_REST_API_KEY
    } else {
        [string]$settings.apiKey
    }

    $effectiveBaseUri = if ($BaseUri) {
        $BaseUri.TrimEnd("/")
    } elseif ($env:OBSIDIAN_REST_API_BASE_URI) {
        $env:OBSIDIAN_REST_API_BASE_URI.TrimEnd("/")
    } elseif ($settings.enableSecureServer) {
        "https://127.0.0.1:{0}" -f [int]$settings.port
    } elseif ($settings.enableInsecureServer) {
        "http://127.0.0.1:{0}" -f [int]$settings.insecurePort
    } else {
        $null
    }

    [pscustomobject]@{
        VaultRoot             = $VaultRoot
        VaultName             = Split-Path $VaultRoot -Leaf
        ConfigPath            = $configPath
        ApiKey                = $effectiveApiKey
        BaseUri               = $effectiveBaseUri
        SecureServerEnabled   = [bool]$settings.enableSecureServer
        InsecureServerEnabled = [bool]$settings.enableInsecureServer
        SecurePort            = [int]$settings.port
        InsecurePort          = [int]$settings.insecurePort
    }
}

function ConvertTo-ObsidianPathToken {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Value
    )

    return [System.Uri]::EscapeDataString($Value)
}

function ConvertFrom-ObsidianCurlHeaders {
    [CmdletBinding()]
    param(
        [string]$HeaderText
    )

    $result = [ordered]@{}
    if ([string]::IsNullOrWhiteSpace($HeaderText)) {
        return [pscustomobject]$result
    }

    $normalized = $HeaderText -replace "`r", ""
    $blocks = $normalized -split "`n`n"
    $lastBlock = ($blocks | Where-Object { $_.Trim() })[-1]
    if (-not $lastBlock) {
        return [pscustomobject]$result
    }

    $lines = $lastBlock -split "`n"
    foreach ($line in ($lines | Select-Object -Skip 1)) {
        if ($line -match "^(?<name>[^:]+):\s*(?<value>.*)$") {
            $result[$matches.name] = $matches.value
        }
    }

    return [pscustomobject]$result
}

function Invoke-ObsidianApiRequest {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateSet("GET", "POST", "PUT", "PATCH", "DELETE")]
        [string]$Method,
        [Parameter(Mandatory)]
        [string]$Path,
        [AllowNull()]
        [string]$Body,
        [string]$ContentType = "application/json",
        [hashtable]$Headers = @{},
        [switch]$NoAuth,
        [string]$VaultRoot = (Get-ObsidianVaultRoot),
        [string]$ApiKey,
        [string]$BaseUri
    )

    $config = Get-ObsidianAutomationConfig -VaultRoot $VaultRoot -ApiKey $ApiKey -BaseUri $BaseUri
    if (-not $config.BaseUri) {
        throw "Local REST API does not expose a base URI. Check '.obsidian/plugins/obsidian-local-rest-api/data.json'."
    }

    $uri = if ($Path -match "^https?://") {
        $Path
    } else {
        "{0}/{1}" -f $config.BaseUri.TrimEnd("/"), $Path.TrimStart("/")
    }

    $stdoutPath = [System.IO.Path]::GetTempFileName()
    $stderrPath = [System.IO.Path]::GetTempFileName()
    $headersPath = [System.IO.Path]::GetTempFileName()
    $bodyPath = [System.IO.Path]::GetTempFileName()
    $payloadPath = $null

    try {
        $args = @(
            "--silent",
            "--show-error",
            "--request", $Method,
            "--output", $bodyPath,
            "--dump-header", $headersPath,
            "--write-out", "%{http_code}",
            "--connect-timeout", "3",
            "--max-time", "15"
        )

        if ($uri -like "https://*") {
            $args += "-k"
        }

        if (-not $NoAuth) {
            if (-not $config.ApiKey) {
                throw "No API key available. Set OBSIDIAN_REST_API_KEY or configure the plugin key locally."
            }
            $args += @("--header", "Authorization: Bearer $($config.ApiKey)")
        }

        foreach ($entry in $Headers.GetEnumerator()) {
            $args += @("--header", "{0}: {1}" -f $entry.Key, $entry.Value)
        }

        if ($PSBoundParameters.ContainsKey("Body")) {
            $payloadPath = [System.IO.Path]::GetTempFileName()
            $payloadText = if ($null -eq $Body) { "" } else { $Body }
            [System.IO.File]::WriteAllText($payloadPath, $payloadText, [System.Text.Encoding]::UTF8)
            if (-not $Headers.ContainsKey("Content-Type")) {
                $args += @("--header", "Content-Type: $ContentType")
            }
            $args += @("--data-binary", "@$payloadPath")
        }

        $args += $uri

        $quotedArgs = foreach ($arg in $args) {
            if ($null -eq $arg) {
                '""'
            } elseif ($arg -match '[\s"]') {
                '"' + ($arg -replace '(\\*)"', '$1$1\"' -replace '(\\+)$', '$1$1') + '"'
            } else {
                $arg
            }
        }

        $process = Start-Process -FilePath "curl.exe" -ArgumentList $quotedArgs -NoNewWindow -Wait -PassThru `
            -RedirectStandardOutput $stdoutPath -RedirectStandardError $stderrPath

        $stdout = if (Test-Path $stdoutPath) { (Get-Content -Raw $stdoutPath).Trim() } else { "" }
        $stderr = if (Test-Path $stderrPath) { (Get-Content -Raw $stderrPath).Trim() } else { "" }
        $responseBody = if (Test-Path $bodyPath) { Get-Content -Raw $bodyPath } else { "" }
        $responseHeaders = if (Test-Path $headersPath) {
            ConvertFrom-ObsidianCurlHeaders -HeaderText (Get-Content -Raw $headersPath)
        } else {
            [pscustomobject]@{}
        }

        if ($process.ExitCode -ne 0) {
            $message = if ($stderr) { $stderr } else { $responseBody }
            throw "Request to '$uri' failed: $message"
        }

        $statusCode = 0
        if (-not [int]::TryParse($stdout, [ref]$statusCode)) {
            throw "Could not parse HTTP status code returned by curl for '$uri'."
        }

        $jsonBody = $null
        if (-not [string]::IsNullOrWhiteSpace($responseBody)) {
            try {
                $jsonBody = $responseBody | ConvertFrom-Json
            } catch {
                $jsonBody = $null
            }
        }

        if ($statusCode -ge 400) {
            $message = if ($jsonBody -and $jsonBody.message) {
                $jsonBody.message
            } elseif ($responseBody) {
                $responseBody
            } else {
                "HTTP $statusCode"
            }
            throw ("Request to '{0}' failed with HTTP {1}: {2}" -f $uri, $statusCode, $message)
        }

        return [pscustomobject]@{
            Method     = $Method
            Uri        = $uri
            StatusCode = $statusCode
            Headers    = $responseHeaders
            Body       = $responseBody
            Json       = $jsonBody
        }
    }
    finally {
        foreach ($temp in @($stdoutPath, $stderrPath, $headersPath, $bodyPath, $payloadPath)) {
            if ($temp -and (Test-Path $temp)) {
                Remove-Item $temp -Force -ErrorAction SilentlyContinue
            }
        }
    }
}

function Test-ObsidianApi {
    [CmdletBinding()]
    param(
        [string]$VaultRoot = (Get-ObsidianVaultRoot),
        [string]$ApiKey,
        [string]$BaseUri
    )

    $config = Get-ObsidianAutomationConfig -VaultRoot $VaultRoot -ApiKey $ApiKey -BaseUri $BaseUri

    try {
        $response = Invoke-ObsidianApiRequest -Method GET -Path "/" -NoAuth -VaultRoot $VaultRoot -ApiKey $ApiKey -BaseUri $BaseUri
        [pscustomobject]@{
            Online    = $true
            BaseUri   = $config.BaseUri
            VaultName = $config.VaultName
            Response  = $response.Json
        }
    }
    catch {
        [pscustomobject]@{
            Online    = $false
            BaseUri   = $config.BaseUri
            VaultName = $config.VaultName
            Error     = $_.Exception.Message
        }
    }
}

function New-ObsidianUri {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Action,
        [hashtable]$Query = @{}
    )

    $pairs = foreach ($entry in $Query.GetEnumerator()) {
        "{0}={1}" -f (ConvertTo-ObsidianPathToken -Value $entry.Key), (ConvertTo-ObsidianPathToken -Value ([string]$entry.Value))
    }

    if ($pairs.Count -eq 0) {
        return "obsidian://$Action"
    }

    return "obsidian://{0}?{1}" -f $Action, ($pairs -join "&")
}

function Start-ObsidianUri {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Uri
    )

    Start-Process $Uri | Out-Null
    return [pscustomobject]@{
        Method = "uri"
        Uri    = $Uri
    }
}

function Open-ObsidianVaultFile {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Path,
        [switch]$NewLeaf,
        [switch]$AllowCreate,
        [string]$VaultRoot = (Get-ObsidianVaultRoot),
        [string]$ApiKey,
        [string]$BaseUri
    )

    $config = Get-ObsidianAutomationConfig -VaultRoot $VaultRoot -ApiKey $ApiKey -BaseUri $BaseUri
    $fullPath = Join-Path $config.VaultRoot $Path

    if (-not $AllowCreate -and -not (Test-Path $fullPath -PathType Leaf)) {
        throw "Refusing to open '$Path' because it does not exist locally."
    }

    $apiStatus = Test-ObsidianApi -VaultRoot $VaultRoot -ApiKey $ApiKey -BaseUri $BaseUri
    if ($apiStatus.Online) {
        $encodedPath = ConvertTo-ObsidianPathToken -Value ($Path -replace "\\", "/")
        $query = if ($NewLeaf) { "?newLeaf=true" } else { "" }
        Invoke-ObsidianApiRequest -Method POST -Path ("open/{0}{1}" -f $encodedPath, $query) `
            -VaultRoot $VaultRoot -ApiKey $ApiKey -BaseUri $BaseUri | Out-Null

        return [pscustomobject]@{
            Method = "api"
            Path   = $Path
            Uri    = "{0}/open/{1}{2}" -f $config.BaseUri, $encodedPath, $query
        }
    }

    $uri = New-ObsidianUri -Action "open" -Query @{
        vault = $config.VaultName
        file  = ($Path -replace "\\", "/")
    }

    $result = Start-ObsidianUri -Uri $uri
    return [pscustomobject]@{
        Method = $result.Method
        Path   = $Path
        Uri    = $result.Uri
    }
}

function Get-ObsidianCommands {
    [CmdletBinding()]
    param(
        [string]$VaultRoot = (Get-ObsidianVaultRoot),
        [string]$ApiKey,
        [string]$BaseUri
    )

    $response = Invoke-ObsidianApiRequest -Method GET -Path "commands/" -VaultRoot $VaultRoot -ApiKey $ApiKey -BaseUri $BaseUri
    return $response.Json.commands
}

function Invoke-ObsidianCommand {
    [CmdletBinding()]
    param(
        [string]$CommandId,
        [string]$CommandName,
        [string]$VaultRoot = (Get-ObsidianVaultRoot),
        [string]$ApiKey,
        [string]$BaseUri
    )

    if (-not $CommandId) {
        if (-not $CommandName) {
            throw "Provide CommandId or CommandName."
        }

        $matches = @(Get-ObsidianCommands -VaultRoot $VaultRoot -ApiKey $ApiKey -BaseUri $BaseUri | Where-Object {
            $_.name -eq $CommandName
        })

        if ($matches.Count -eq 0) {
            throw "Command '$CommandName' was not found."
        }
        if ($matches.Count -gt 1) {
            throw "Command '$CommandName' is ambiguous. Use CommandId."
        }

        $CommandId = $matches[0].id
    }

    $encodedId = ConvertTo-ObsidianPathToken -Value $CommandId
    Invoke-ObsidianApiRequest -Method POST -Path ("commands/{0}/" -f $encodedId) `
        -VaultRoot $VaultRoot -ApiKey $ApiKey -BaseUri $BaseUri | Out-Null

    return [pscustomobject]@{
        Method    = "api"
        CommandId = $CommandId
    }
}

function Invoke-ObsidianQuickAdd {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$ChoiceName,
        [string]$ChoiceId,
        [hashtable]$Variables = @{},
        [string]$VaultRoot = (Get-ObsidianVaultRoot),
        [string]$ApiKey,
        [string]$BaseUri
    )

    $config = Get-ObsidianAutomationConfig -VaultRoot $VaultRoot -ApiKey $ApiKey -BaseUri $BaseUri
    $apiStatus = Test-ObsidianApi -VaultRoot $VaultRoot -ApiKey $ApiKey -BaseUri $BaseUri

    if ($apiStatus.Online -and $ChoiceId -and $Variables.Count -eq 0) {
        return Invoke-ObsidianCommand -CommandId ("quickadd:choice:{0}" -f $ChoiceId) `
            -VaultRoot $VaultRoot -ApiKey $ApiKey -BaseUri $BaseUri
    }

    $query = [ordered]@{
        vault  = $config.VaultName
        choice = $ChoiceName
    }

    foreach ($entry in $Variables.GetEnumerator()) {
        $query["value-$($entry.Key)"] = [string]$entry.Value
    }

    $uri = New-ObsidianUri -Action "quickadd" -Query $query
    $result = Start-ObsidianUri -Uri $uri

    return [pscustomobject]@{
        Method   = $result.Method
        Choice   = $ChoiceName
        ChoiceId = $ChoiceId
        Uri      = $result.Uri
    }
}

function Get-ObsidianPeriodicNotePath {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateSet("daily", "weekly", "monthly", "quarterly", "yearly")]
        [string]$Period,
        [datetime]$Date = (Get-Date),
        [string]$VaultRoot = (Get-ObsidianVaultRoot),
        [string]$ApiKey,
        [string]$BaseUri
    )

    $path = "periodic/{0}/{1}/{2}/{3}/" -f $Period, $Date.Year, $Date.Month, $Date.Day
    $response = Invoke-ObsidianApiRequest -Method PUT -Path $path -Body "" -ContentType "text/markdown" `
        -VaultRoot $VaultRoot -ApiKey $ApiKey -BaseUri $BaseUri

    $contentLocation = $null
    foreach ($headerName in @("Content-Location", "content-location")) {
        if ($response.Headers.PSObject.Properties.Name -contains $headerName) {
            $contentLocation = $response.Headers.$headerName
            break
        }
    }

    if (-not $contentLocation) {
        throw "Periodic endpoint did not return Content-Location for '$Period'."
    }

    return [System.Uri]::UnescapeDataString([string]$contentLocation).TrimStart("/")
}

function Open-ObsidianPeriodicNote {
    [CmdletBinding()]
    param(
        [ValidateSet("daily", "weekly", "monthly", "quarterly", "yearly")]
        [string]$Period = "daily",
        [datetime]$Date = (Get-Date),
        [string]$VaultRoot = (Get-ObsidianVaultRoot),
        [string]$ApiKey,
        [string]$BaseUri
    )

    $apiStatus = Test-ObsidianApi -VaultRoot $VaultRoot -ApiKey $ApiKey -BaseUri $BaseUri
    if (-not $apiStatus.Online) {
        throw "Obsidian Local REST API is offline. Open Obsidian and keep the Local REST API plugin enabled."
    }

    $today = Get-Date
    $isCurrentPeriod = switch ($Period) {
        "daily" { $Date.Date -eq $today.Date }
        default { $Date.Date -eq $today.Date }
    }

    if ($isCurrentPeriod) {
        return Invoke-ObsidianCommand -CommandId ("periodic-notes:open-{0}-note" -f $Period) `
            -VaultRoot $VaultRoot -ApiKey $ApiKey -BaseUri $BaseUri
    }

    $notePath = Get-ObsidianPeriodicNotePath -Period $Period -Date $Date -VaultRoot $VaultRoot -ApiKey $ApiKey -BaseUri $BaseUri
    return Open-ObsidianVaultFile -Path $notePath -AllowCreate -VaultRoot $VaultRoot -ApiKey $ApiKey -BaseUri $BaseUri
}

function Open-ObsidianReview {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateSet("Morning", "Evening")]
        [string]$Type,
        [string]$ReviewDate = (Get-Date -Format "yyyy-MM-dd"),
        [string]$VaultRoot = (Get-ObsidianVaultRoot),
        [string]$ApiKey,
        [string]$BaseUri
    )

    Invoke-ObsidianQuickAdd -ChoiceName ("{0} Review" -f $Type) -Variables @{
        review_date = $ReviewDate
    } -VaultRoot $VaultRoot -ApiKey $ApiKey -BaseUri $BaseUri
}

Export-ModuleMember -Function `
    Get-ObsidianAutomationConfig, `
    Get-ObsidianCommands, `
    Get-ObsidianPeriodicNotePath, `
    Invoke-ObsidianApiRequest, `
    Invoke-ObsidianCommand, `
    Invoke-ObsidianQuickAdd, `
    Open-ObsidianPeriodicNote, `
    Open-ObsidianReview, `
    Open-ObsidianVaultFile, `
    Start-ObsidianUri, `
    Test-ObsidianApi
