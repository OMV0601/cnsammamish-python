@echo off
title Python Camp Server
cd /d "%~dp0"
echo Starting Python Camp...
echo.
node --disable-warning=ExperimentalWarning server.js
echo.
echo The camp server has stopped.
pause
