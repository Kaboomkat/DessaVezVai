[CmdletBinding()]
param(
    [string]$Filter
)

Import-Module (Join-Path $PSScriptRoot "ObsidianAutomation.psm1") -Force

try {
    $commands = @(Get-ObsidianCommands)
    if ($Filter) {
        $commands = $commands | Where-Object {
            $_.id -like "*$Filter*" -or $_.name -like "*$Filter*"
        }
    }

    $commands | Sort-Object name
}
catch {
    Write-Error "Nao foi possivel listar os comandos do Obsidian. Abra o app desktop e confirme que o plugin Local REST API esta ativo."
    exit 1
}
