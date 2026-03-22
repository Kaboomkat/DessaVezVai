[CmdletBinding()]
param()

Import-Module (Join-Path $PSScriptRoot "ObsidianAutomation.psm1") -Force

$config = Get-ObsidianAutomationConfig
$status = Test-ObsidianApi

[pscustomobject]@{
    vault_name      = $config.VaultName
    vault_root      = $config.VaultRoot
    api_base_uri    = $config.BaseUri
    api_key_present = [bool]$config.ApiKey
    api_online      = [bool]$status.Online
    api_error       = $status.Error
}
