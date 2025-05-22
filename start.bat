@echo off
echo 🚀 Starting Social Media Content Scheduler...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v18 or higher.
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist ".env" (
    echo ⚠️  .env file not found. Please create one based on .env.example
    pause
    exit /b 1
)

echo 📦 Installing dependencies...

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

REM Install frontend dependencies
echo Installing frontend dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

cd ..

echo ✅ Dependencies installed successfully!
echo.
echo 🎯 To start the application:
echo    1. Start the backend: cd backend ^&^& npm run start:dev
echo    2. Start the frontend: cd frontend ^&^& npm run dev
echo.
echo 📱 The application will be available at:
echo    - Frontend: http://localhost:5173
echo    - Backend API: http://localhost:3000
echo.
echo 🔧 Make sure MongoDB and Redis are running before starting the services.
echo.
pause 
