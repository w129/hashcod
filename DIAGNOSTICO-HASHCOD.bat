@echo off
setlocal
cd /d "%~dp0"
title Diagnostico Hashcod
node scripts\setup-local.js --quiet
call npm test
echo.
if errorlevel 1 (
  echo DIAGNOSTICO: SE ENCONTRARON ERRORES
) else (
  echo DIAGNOSTICO: TODO CORRECTO
)
pause
endlocal
