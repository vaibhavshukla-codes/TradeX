#!/bin/bash

# TradeX - Stop All Servers Script

echo "🛑 Stopping TradeX Platform..."
echo "================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Function to kill process on port
kill_port() {
    PORT=$1
    NAME=$2
    
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
        echo -e "Stopping ${NAME} (Port ${PORT})..."
        lsof -ti:$PORT | xargs kill -9 2>/dev/null
        echo -e "${GREEN}✅ ${NAME} stopped${NC}"
    else
        echo -e "${RED}ℹ️  ${NAME} was not running${NC}"
    fi
}

# Stop all servers
kill_port 3000 "Frontend"
kill_port 3001 "Dashboard"
kill_port 3002 "Backend"

echo ""
echo "================================"
echo -e "${GREEN}✅ All servers stopped!${NC}"
echo ""

