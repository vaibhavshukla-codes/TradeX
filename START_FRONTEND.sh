#!/bin/bash

# TradeX Frontend Startup Script
# This script properly sets the file descriptor limit and starts the frontend

echo "🚀 Starting TradeX Frontend..."
echo ""

# Increase file descriptor limit for macOS
ulimit -n 10000
echo "✅ File descriptor limit increased to $(ulimit -n)"

# Kill any existing process on port 3000
if lsof -ti:3000 >/dev/null 2>&1; then
  echo "⚠️  Port 3000 is in use. Killing existing process..."
  lsof -ti:3000 | xargs kill -9 2>/dev/null || true
  sleep 2
  echo "✅ Port 3000 cleared"
fi

# Navigate to frontend directory
cd "$(dirname "$0")/frontend"

# Clear caches
echo "🧹 Clearing webpack cache..."
rm -rf node_modules/.cache .cache 2>/dev/null

echo ""
echo "🎯 Starting development server on http://localhost:3000"
echo "   Press Ctrl+C to stop"
echo ""

# Start the development server
npm start


