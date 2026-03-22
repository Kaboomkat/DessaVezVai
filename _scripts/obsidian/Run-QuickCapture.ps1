[CmdletBinding()]
param()

Import-Module (Join-Path $PSScriptRoot "ObsidianAutomation.psm1") -Force

Invoke-ObsidianQuickAdd -ChoiceId "quick-capture" -ChoiceName "Quick Capture"
