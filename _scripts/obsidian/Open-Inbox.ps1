[CmdletBinding()]
param()

Import-Module (Join-Path $PSScriptRoot "ObsidianAutomation.psm1") -Force

Open-ObsidianVaultFile -Path "04-Tasks/Inbox/Inbox.md"
