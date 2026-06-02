$ErrorActionPreference = 'Stop'
$destination = Join-Path (Split-Path -Parent $PSScriptRoot) 'upstream-warp'
if (Test-Path -LiteralPath $destination) {
  throw "Destination already exists: $destination"
}
git clone https://github.com/warpdotdev/Warp.git $destination
Write-Host "Warp upstream cloned to $destination"
