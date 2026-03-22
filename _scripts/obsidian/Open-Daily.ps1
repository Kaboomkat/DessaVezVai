[CmdletBinding()]
param(
    [datetime]$Date = (Get-Date)
)

Import-Module (Join-Path $PSScriptRoot "ObsidianAutomation.psm1") -Force

try {
    Open-ObsidianPeriodicNote -Period "daily" -Date $Date
}
catch {
    Write-Error "Nao foi possivel abrir a daily note via Periodic Notes. Abra o Obsidian desktop e confirme que o plugin Local REST API esta ativo."
    exit 1
}
