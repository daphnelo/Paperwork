@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel% equ 0 (
  py -3 server.py --open
) else (
  python server.py --open
)
if errorlevel 1 (
  echo.
  echo Paperwork did not start. Read the message above.
  echo If an older server is running, close its window and run this file again.
  echo If Python is missing, install Python 3.10 or newer from python.org.
  pause
)
