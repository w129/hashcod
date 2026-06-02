$ErrorActionPreference = 'Stop'
$toolRoot = Split-Path -Parent $PSScriptRoot
$destination = Join-Path (Split-Path -Parent $toolRoot) 'hashcod-docuseal-tool-source.zip'
if (Test-Path $destination) { Remove-Item -LiteralPath $destination -Force }
Compress-Archive -Path $toolRoot -DestinationPath $destination -CompressionLevel Optimal
Write-Host "Created $destination"
