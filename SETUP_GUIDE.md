# TradeX - Quick Setup Guide

This guide will help you set up and run the TradeX trading platform on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/downloads)

## Step-by-Step Setup

### Step 1: MongoDB Setup

#### Option A: Local MongoDB

1. Start MongoDB service:

   ```bash
   # macOS (using Homebrew)
   brew services start mongodb-community

   # Windows (as admin)
   net start MongoDB

   # Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Cloud)

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Replace in `.env` file

### Step 2: Backend Setup

1. Navigate to backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file:

   ```bash
   # Create .env file
   touch .env
   ```

4. Add environment variables to `.env`:

   ```env
   PORT=3002
   MONGO_URL=mongodb://localhost:27017/tradex
   ```

   For MongoDB Atlas, use:

   ```env
   PORT=3002
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/tradex?retryWrites=true&w=majority
   ```

5. Seed the database with sample data:

   ```bash
   npm run seed
   ```

6. Start the backend server:

   ```bash
   npm start
   ```

   ✓ Backend should now be running on `http://localhost:3002`

### Step 3: Frontend Setup

1. Open a new terminal and navigate to frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install --legacy-peer-deps
   ```

3. Start the frontend server:

   ```bash
   npm start
   ```

   ✓ Frontend should now be running on `http://localhost:3000`

### Step 4: Dashboard Setup

1. Open a new terminal and navigate to dashboard directory:

   ```bash
   cd dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the dashboard server:

   ```bash
   npm start
   ```

   ✓ Dashboard should now be running on `http://localhost:3001`

## Verification

After completing all steps, you should have:

- ✅ Backend running on `http://localhost:3002`
- ✅ Frontend running on `http://localhost:3000`
- ✅ Dashboard running on `http://localhost:3001`
- ✅ MongoDB connection established
- ✅ Sample data seeded in database

## Testing the Application

### 1. Create an Account

1. Open browser and go to `http://localhost:3000`
2. Click "Signup" in the navigation bar
3. Fill in the registration form:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
4. Click "Continue"

### 2. Login (if not automatically logged in)

1. Go to `http://localhost:3000/login`
2. Enter your credentials
3. Click "Login"

### 3. Access Dashboard

After successful login, you'll be redirected to `http://localhost:3001`

### 4. Explore Features

- **Dashboard**: View your portfolio summary
- **Holdings**: See your stock holdings with charts
- **Positions**: View active trading positions
- **Orders**: Place and view orders
- **Watchlist**: Monitor stocks and place quick trades

### 5. Place a Test Order

1. In the dashboard, hover over a stock in the watchlist
2. Click "Buy"
3. Enter quantity and price
4. Click "Buy" to place order
5. Navigate to "Orders" to see your placed order

## Troubleshooting

### MongoDB Connection Failed

**Issue**: `MongoDB Connection Error`

**Solutions**:

- Verify MongoDB is running: `mongosh` or `mongo`
- Check MONGO_URL in `.env` file
- For Atlas, verify IP whitelist and credentials

### Port Already in Use

**Issue**: `EADDRINUSE: address already in use`

**Solutions**:

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Kill process on port 3002
lsof -ti:3002 | xargs kill -9
```

Or change ports in respective configuration files.

### CORS Errors

**Issue**: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solutions**:

- Verify backend CORS configuration includes frontend URLs
- Check that `withCredentials: true` is set in API calls
- Clear browser cache and cookies

### Module Not Found

**Issue**: `Cannot find module 'xyz'`

**Solutions**:

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# For frontend, use legacy peer deps
npm install --legacy-peer-deps
```

### Session Issues

**Issue**: Login successful but not authenticated on dashboard

**Solutions**:

- Ensure all three servers are running
- Clear browser cookies
- Check backend session configuration
- Verify CORS credentials are set correctly

### Empty Holdings/Positions

**Issue**: No data showing in Holdings/Positions

**Solutions**:

```bash
# Re-seed the database
cd backend
npm run seed
```

## Development Tips

### Hot Reload

All three applications support hot reload. Changes will automatically refresh the browser.

### Database Management

View data in MongoDB:

```bash
# Connect to MongoDB
mongosh

# Switch to database
use tradex

# View collections
show collections

# View holdings
db.holdings.find()

# View users
db.users.find()
```

### API Testing

Test backend endpoints with curl:

```bash
# Check backend health
curl http://localhost:3002/checkAuth

# Get all holdings
curl http://localhost:3002/allHoldings

# Get all positions
curl http://localhost:3002/allPositions
```

## Next Steps

Now that your application is running:

1. Explore the landing page features
2. Create multiple test accounts
3. Place different types of orders
4. Monitor your portfolio
5. Customize the UI to your liking

## Need Help?

- Check the main README.md for detailed documentation
- Review the code comments
- Open an issue on the repository

## Quick Command Reference

```bash
# Start all services (run in separate terminals)
cd backend && npm start
cd frontend && npm start
cd dashboard && npm start

# Seed database
cd backend && npm run seed

# Clean install
rm -rf node_modules package-lock.json && npm install
```

Happy Trading! 📈
