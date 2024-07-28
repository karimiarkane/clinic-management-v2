@echo off
echo Setting up Clinic Management System...

REM Check if Docker is installed
docker --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Docker is not installed. Please install Docker from https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

REM Navigate to the project directory
cd /d "%~dp0"

REM Build the Docker image and start the containers
docker-compose down
docker-compose build --no-cache


REM Tag the Docker image
docker tag clinique:latest clinique:latest


docker save -o clinique_latest.tar clinique:latest


docker-compose up -d

echo Setup complete. You can now double-click start-app.bat to run the application.
pause
