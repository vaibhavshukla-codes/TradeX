#!/bin/bash

# TradeX - Complete System Verification Script
# This script checks if everything is working correctly

echo "🔍 TradeX Platform Verification"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check MongoDB
echo -e "${BLUE}1. Checking MongoDB...${NC}"
if mongosh --eval "db.version()" --quiet > /dev/null 2>&1; then
    VERSION=$(mongosh --eval "db.version()" --quiet 2>&1)
    echo -e "${GREEN}✅ MongoDB is running (Version: $VERSION)${NC}"
else
    echo -e "${RED}❌ MongoDB is NOT running${NC}"
    echo "   Start with: brew services start mongodb-community@7.0"
fi

echo ""

# Check Backend
echo -e "${BLUE}2. Checking Backend Server...${NC}"
if curl -s http://localhost:3002/checkAuth > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend is running on port 3002${NC}"
    RESPONSE=$(curl -s http://localhost:3002/checkAuth)
    echo "   Response: $RESPONSE"
else
    echo -e "${RED}❌ Backend is NOT running on port 3002${NC}"
    echo "   Start with: cd backend && node index.js"
fi

echo ""

# Check Dashboard
echo -e "${BLUE}3. Checking Dashboard...${NC}"
if curl -s http://localhost:3001 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Dashboard is running on port 3001${NC}"
else
    echo -e "${RED}❌ Dashboard is NOT running on port 3001${NC}"
    echo "   Start with: cd dashboard && PORT=3001 npm start"
fi

echo ""

# Check Frontend
echo -e "${BLUE}4. Checking Frontend...${NC}"
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend is running on port 3000${NC}"
else
    echo -e "${RED}❌ Frontend is NOT running on port 3000${NC}"
    echo "   Start with: cd frontend && npm start"
fi

echo ""

# Check Database Connection
echo -e "${BLUE}5. Checking Database Connection...${NC}"
if mongosh tradex --eval "db.stats()" --quiet > /dev/null 2>&1; then
    COLLECTIONS=$(mongosh tradex --eval "db.getCollectionNames().length" --quiet 2>&1)
    echo -e "${GREEN}✅ Database 'tradex' is accessible${NC}"
    echo "   Collections: $COLLECTIONS"
else
    echo -e "${RED}❌ Cannot access database 'tradex'${NC}"
fi

echo ""

# Check Holdings Data
echo -e "${BLUE}6. Checking Holdings Data...${NC}"
HOLDINGS_COUNT=$(curl -s http://localhost:3002/allHoldings 2>/dev/null | python3 -c "import sys, json; print(len(json.load(sys.stdin)))" 2>/dev/null)
if [ ! -z "$HOLDINGS_COUNT" ]; then
    if [ "$HOLDINGS_COUNT" -gt 0 ]; then
        echo -e "${GREEN}✅ Holdings data available ($HOLDINGS_COUNT items)${NC}"
    else
        echo -e "${YELLOW}⚠️  No holdings data (run: node backend/seedData.js)${NC}"
    fi
else
    echo -e "${RED}❌ Cannot fetch holdings data${NC}"
fi

echo ""

# Check Positions Data
echo -e "${BLUE}7. Checking Positions Data...${NC}"
POSITIONS_COUNT=$(curl -s http://localhost:3002/allPositions 2>/dev/null | python3 -c "import sys, json; print(len(json.load(sys.stdin)))" 2>/dev/null)
if [ ! -z "$POSITIONS_COUNT" ]; then
    if [ "$POSITIONS_COUNT" -gt 0 ]; then
        echo -e "${GREEN}✅ Positions data available ($POSITIONS_COUNT items)${NC}"
    else
        echo -e "${YELLOW}⚠️  No positions data (run: node backend/seedData.js)${NC}"
    fi
else
    echo -e "${RED}❌ Cannot fetch positions data${NC}"
fi

echo ""

# Check Environment Files
echo -e "${BLUE}8. Checking Environment Configuration...${NC}"
if [ -f "backend/.env" ]; then
    echo -e "${GREEN}✅ backend/.env exists${NC}"
else
    echo -e "${RED}❌ backend/.env is missing${NC}"
fi

if [ -f "dashboard/.env" ]; then
    echo -e "${GREEN}✅ dashboard/.env exists${NC}"
else
    echo -e "${RED}❌ dashboard/.env is missing${NC}"
fi

echo ""

# Summary
echo "================================"
echo -e "${BLUE}📊 System Status Summary${NC}"
echo "================================"
echo ""

# Count services
SERVICES_UP=0
[ "$(lsof -ti:27017 2>/dev/null)" ] && ((SERVICES_UP++))
[ "$(lsof -ti:3002 2>/dev/null)" ] && ((SERVICES_UP++))
[ "$(lsof -ti:3001 2>/dev/null)" ] && ((SERVICES_UP++))
[ "$(lsof -ti:3000 2>/dev/null)" ] && ((SERVICES_UP++))

if [ $SERVICES_UP -eq 4 ]; then
    echo -e "${GREEN}✅ All services are running! (4/4)${NC}"
    echo ""
    echo "🎉 Your TradeX platform is ready!"
    echo ""
    echo "📍 Access URLs:"
    echo "   Frontend:  http://localhost:3000"
    echo "   Dashboard: http://localhost:3001"
    echo "   Backend:   http://localhost:3002"
    echo ""
    echo "🚀 Next Steps:"
    echo "   1. Visit http://localhost:3000"
    echo "   2. Click 'Signup' to create an account"
    echo "   3. You'll be redirected to the dashboard"
    echo "   4. Start trading!"
    echo ""
elif [ $SERVICES_UP -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Some services are running ($SERVICES_UP/4)${NC}"
    echo ""
    echo "To start all services, run:"
    echo "   ./start-all.sh"
    echo ""
else
    echo -e "${RED}❌ No services are running${NC}"
    echo ""
    echo "To start all services, run:"
    echo "   ./start-all.sh"
    echo ""
fi

echo "================================"
echo ""

# Instructions
echo "💡 Quick Commands:"
echo "   Verify setup:    ./verify-setup.sh"
echo "   Start all:       ./start-all.sh"
echo "   Stop all:        ./stop-all.sh"
echo "   Add test data:   cd backend && node seedData.js"
echo ""

