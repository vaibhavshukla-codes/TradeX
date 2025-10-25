#!/bin/bash

# TradeX - Start All Servers Script
# This script starts all three servers needed for TradeX to work

echo "🚀 Starting TradeX Platform..."
echo "================================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if ports are already in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${YELLOW}⚠️  Port $1 is already in use. Skipping...${NC}"
        return 1
    fi
    return 0
}

# Start Backend (Port 3002)
echo ""
echo -e "${BLUE}📦 Starting Backend Server (Port 3002)...${NC}"
if check_port 3002; then
    cd backend
    node index.js > ../logs/backend.log 2>&1 &
    echo -e "${GREEN}✅ Backend started: http://localhost:3002${NC}"
    cd ..
fi

# Wait a moment for backend to initialize
sleep 2

# Start Dashboard (Port 3001)
echo ""
echo -e "${BLUE}📊 Starting Dashboard (Port 3001)...${NC}"
if check_port 3001; then
    cd dashboard
    npm start > ../logs/dashboard.log 2>&1 &
    echo -e "${GREEN}✅ Dashboard started: http://localhost:3001${NC}"
    cd ..
fi

# Wait a moment
sleep 2

# Start Frontend (Port 3000)
echo ""
echo -e "${BLUE}🌐 Starting Frontend (Port 3000)...${NC}"
if check_port 3000; then
    cd frontend
    # Increase file descriptor limit for macOS
    ulimit -n 10000 2>/dev/null
    npm start > ../logs/frontend.log 2>&1 &
    echo -e "${GREEN}✅ Frontend started: http://localhost:3000${NC}"
    cd ..
fi

echo ""
echo "================================"
echo -e "${GREEN}🎉 TradeX Platform Started!${NC}"
echo ""
echo "📍 Access URLs:"
echo "   Frontend:  http://localhost:3000"
echo "   Dashboard: http://localhost:3001"
echo "   Backend:   http://localhost:3002"
echo ""
echo "💡 Tips:"
echo "   • Visit http://localhost:3000 to get started"
echo "   • Sign up to create an account"
echo "   • After signup, you'll be redirected to the dashboard"
echo ""
echo "🛑 To stop all servers, run: ./stop-all.sh"
echo "📝 Logs are saved in the ./logs/ directory"
echo ""

