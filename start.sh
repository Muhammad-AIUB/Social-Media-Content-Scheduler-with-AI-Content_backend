#!/bin/bash

# Social Media Scheduler Startup Script

echo "🚀 Starting Social Media Content Scheduler..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo "   You can start MongoDB with: sudo systemctl start mongod"
fi

# Check if Redis is running
if ! pgrep -x "redis-server" > /dev/null; then
    echo "⚠️  Redis is not running. Please start Redis first."
    echo "   You can start Redis with: sudo systemctl start redis"
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Please create one based on .env.example"
    exit 1
fi

echo "📦 Installing dependencies..."

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

echo "✅ Dependencies installed successfully!"
echo ""
echo "🎯 To start the application:"
echo "   1. Start the backend: cd backend && npm run start:dev"
echo "   2. Start the frontend: cd frontend && npm run dev"
echo ""
echo "📱 The application will be available at:"
echo "   - Frontend: http://localhost:5173"
echo "   - Backend API: http://localhost:3000"
echo ""
echo "🔧 Make sure MongoDB and Redis are running before starting the services." 
