# TradeX - Trading Platform

A full-stack MERN trading platform inspired by Zerodha, featuring user authentication, portfolio management, and real-time trading capabilities.

> **🚀 Quick Start:** New to the project? Start with [START_HERE.md](./START_HERE.md) for the fastest way to get up and running!

## Project Structure

```
TradeX/
├── backend/              # Node.js/Express backend server
│   ├── model/           # Mongoose models
│   ├── schemas/         # Database schemas
│   ├── index.js         # Main server file
│   ├── seedData.js      # Database seeding script
│   └── package.json
├── frontend/            # React landing page and authentication
│   ├── src/
│   │   ├── api/        # API configuration
│   │   ├── context/    # React Context (Auth)
│   │   └── landing_page/  # Landing page components
│   └── package.json
├── dashboard/           # React trading dashboard
│   ├── src/
│   │   ├── components/ # Dashboard components
│   │   └── data/       # Mock data
│   └── package.json
├── README.md            # Main documentation
├── SETUP_GUIDE.md       # Detailed setup instructions
└── PROJECT_STATUS.md    # Project status and roadmap
```

## Features

### Frontend (Landing Page)

- Modern landing page with hero section
- Product information and pricing
- Support and about pages
- User signup and login
- Responsive design

### Dashboard

- Real-time watchlist with stock prices
- Holdings management with visual charts
- Positions tracking
- Order placement system
- Portfolio summary
- Interactive buy/sell interface

### Backend

- User authentication with Passport.js
- MongoDB database integration
- RESTful API endpoints
- Session management
- CORS configuration for multiple frontends

## Technology Stack

- **Frontend**: React 18, React Router DOM, Axios, Bootstrap
- **Dashboard**: React 18, Material-UI, Chart.js, React Chart.js 2
- **Backend**: Node.js, Express 5, MongoDB, Mongoose, Passport.js
- **Authentication**: Passport Local, Express Session

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## Installation & Setup

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=3002
MONGO_URL=mongodb://localhost:27017/tradex
```

Start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:3002`

### 2. Frontend Setup

```bash
cd frontend
npm install --legacy-peer-deps
```

Start the frontend:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

### 3. Dashboard Setup

```bash
cd dashboard
npm install
```

Start the dashboard:

```bash
npm start
```

The dashboard will run on `http://localhost:3001`

## Running the Application

1. **Start MongoDB** (if running locally):

   ```bash
   mongod
   ```

2. **Start Backend Server**:

   ```bash
   cd backend
   npm start
   ```

3. **Start Frontend** (in a new terminal):

   ```bash
   cd frontend
   npm start
   ```

4. **Start Dashboard** (in a new terminal):

   ```bash
   cd dashboard
   npm start
   ```

5. Open your browser:
   - Landing Page: `http://localhost:3000`
   - Dashboard: `http://localhost:3001`
   - Backend API: `http://localhost:3002`

## API Endpoints

### Authentication

- `POST /signup` - Register a new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /checkAuth` - Check authentication status

### Trading

- `GET /allHoldings` - Get all user holdings
- `GET /allPositions` - Get all user positions
- `POST /newOrder` - Place a new order

## Usage Flow

1. **Sign Up**: Navigate to `http://localhost:3000/signup` and create an account
2. **Login**: Use your credentials to login at `http://localhost:3000/login`
3. **Dashboard**: After successful login, you'll be redirected to `http://localhost:3001`
4. **Trade**: View watchlist, place orders, check holdings and positions

## Database Schema

### User Schema

- username (unique)
- email
- password (hashed with passport-local-mongoose)

### Holdings Schema

- name (stock name)
- qty (quantity)
- avg (average price)
- price (current price)
- net (net change percentage)
- day (day change percentage)

### Positions Schema

- product (product type)
- name (stock name)
- qty (quantity)
- avg (average price)
- price (current price)
- net (net change)
- day (day change)
- isLoss (boolean)

### Orders Schema

- name (stock name)
- qty (quantity)
- price (price)
- mode (BUY/SELL)

## Features in Detail

### Watchlist

- View real-time stock prices
- Quick buy/sell actions
- Visual price charts
- Stock analytics

### Holdings

- View all purchased stocks
- Current value calculation
- Profit/Loss tracking
- Visual graphs using Chart.js

### Positions

- Active trading positions
- Real-time P&L
- Day change tracking

### Order Management

- Place buy/sell orders
- Set quantity and price
- Order history

## Security Features

- Password hashing with passport-local-mongoose
- Session-based authentication
- HTTP-only cookies
- CORS protection
- Protected API routes

## Development

### Adding Mock Data

To add sample holdings data (uncomment the route in `backend/index.js`):

```bash
curl http://localhost:3002/addHoldings
```

### Environment Variables

Backend `.env`:

```env
PORT=3002
MONGO_URL=your_mongodb_connection_string
```

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running
- Check the MONGO_URL in `.env` file
- Verify network connectivity

### CORS Errors

- Ensure backend CORS is configured for `http://localhost:3000` and `http://localhost:3001`
- Check that `withCredentials: true` is set in frontend API calls

### Session Issues

- Clear browser cookies
- Check session secret in backend
- Ensure session middleware is properly configured

### Port Conflicts

- Change ports in respective package.json or .env files
- Update CORS origins in backend accordingly

## Future Enhancements

- Real-time stock price updates via WebSocket
- Advanced charting and technical analysis
- Mobile responsive improvements
- Order book and market depth
- News and alerts integration
- Multi-factor authentication
- Paper trading mode
- Transaction history export

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is for educational purposes.

## Acknowledgments

- Inspired by Zerodha's trading platform
- Built with MERN stack
- UI components from Material-UI and Bootstrap

## Documentation

This project includes comprehensive documentation:

- **README.md** (this file): Overview and quick reference
- **SETUP_GUIDE.md**: Step-by-step setup instructions with troubleshooting
- **PROJECT_STATUS.md**: Current status, completed features, and roadmap
- **Notes.txt**: Development notes and tools used

## Quick Start

For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md).

## Support

For issues and questions, please create an issue in the repository.
