@echo off
SETLOCAL

REM Check if Docker is installed
where docker >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Docker is not installed. Please install Docker first.
    pause
    exit /b 1
)
    echo nice Docker is  installed

REM Check if Docker Daemon is running
docker info >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Docker Daemon is not running. Starting Docker Daemon...
    REM Start Docker Desktop (Windows-specific)
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    REM Wait for Docker Daemon to start
    TIMEOUT /T 60
)
    echo nice Docker Daemon is  running. 



    REM Load the Docker image if not already loaded
docker image inspect clinique:latest >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Loading Docker image...
    docker load -i clinique_latest.tar
        echo Docker image loaded.

) ELSE (
    echo Docker image is already loaded.
)

REM Check if Docker Compose is running
docker-compose ps >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Starting Docker Compose...
    docker-compose up -d
    echo Waiting for containers to start...
    TIMEOUT /T 20
    echo Docker Compose started and containers are running.
) ELSE (
    echo Docker Compose is already running.
)



REM Open the application in the browser
start http://localhost:3000

ENDLOCAL
