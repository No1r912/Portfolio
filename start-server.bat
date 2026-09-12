@echo off
cd /d "%~dp0"
start "Portfolio Server" cmd /k "node backend\server.js"
start "" http://localhost:3000
