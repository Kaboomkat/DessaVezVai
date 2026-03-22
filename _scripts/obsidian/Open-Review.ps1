[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [ValidateSet("Morning", "Evening")]
    [string]$Type,
    [string]$Date = (Get-Date -Format "yyyy-MM-dd")
)

Import-Module (Join-Path $PSScriptRoot "ObsidianAutomation.psm1") -Force

Open-ObsidianReview -Type $Type -ReviewDate $Date
