@echo off
setlocal
cd /d "%~dp0"
title Hashcod - Cryptographic Platform

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo [ERROR] Node.js no esta instalado o no aparece en PATH.
  echo Instala Node.js 18 o superior desde https://nodejs.org/
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm no esta disponible.
  pause
  exit /b 1
)

if not exist "node_modules\pdf-lib" (
  echo Instalando dependencias verificadas...
  call npm ci --no-audit --no-fund
  if errorlevel 1 (
    echo [ERROR] No se pudieron instalar las dependencias.
    pause
    exit /b 1
  )
)

node scripts\setup-local.js --quiet
if errorlevel 1 (
  echo [ERROR] No se pudo crear la configuracion local segura.
  pause
  exit /b 1
)

node scripts\local-launcher.js
if errorlevel 1 (
  echo.
  echo [ERROR] Hashcod termino con errores.
  pause
)
endlocal
