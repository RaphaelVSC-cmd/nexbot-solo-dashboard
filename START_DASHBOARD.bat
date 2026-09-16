@echo off
title Nexbot Solo Cockpit Launcher
echo ===================================================
echo   NEXBOT WEBDESIGN - SOLO BUSINESS DASHBOARD
echo   Inhaber: Raphael Neumeier (Manching / Ingolstadt)
echo ===================================================
echo.
echo Starte lokales Cockpit auf Port 3333...

cd /d "%~dp0"

start http://localhost:3333

python -m http.server 3333

pause
