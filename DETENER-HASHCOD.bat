@echo off
setlocal
cd /d "%~dp0"
node scripts\stop-local.js
if errorlevel 1 pause
endlocal
