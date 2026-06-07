require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();

const PORT = process.env.PORT || 3002;
const isProduction = process.env.NODE_ENV === 'production';

// MongoDB Atlas connection string - REQUIRED
if (!process.env.MONGO_URL) {
  console.error('ERROR: MONGO_URL environment variable is required!');
  console.error('Please set MONGO_URL in your .env file with your MongoDB Atlas connection string.');
  process.exit(1);
}
const uri = process.env.MONGO_URL;

// JWT Secret - REQUIRED for production
if (!process.env.JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET not set. Using default (NOT SECURE for production).');
}
const JWT_SECRET = process.env.JWT_SECRET || "zerodha_application_secret_key_change_in_production";

// Production safety checks for CORS
if (isProduction) {
  const hasCorsOrigins =
    Boolean(process.env.FRONTEND_URL) ||
    Boolean(process.env.DASHBOARD_URL) ||
    Boolean(process.env.ALLOWED_ORIGINS);

  if (!hasCorsOrigins) {
    console.error('ERROR: Production CORS origins are not configured.');
    console.error('Set FRONTEND_URL and/or DASHBOARD_URL (or ALLOWED_ORIGINS) in your environment.');
    process.exit(1);
  }
}

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const bodyParser = require("body-parser");
const cors = require("cors");

const isDatabaseConnected = () => mongoose.connection.readyState === 1;

const sendDatabaseUnavailable = (res) => {
  return res.status(503).json({
    message: "Database connection not available. Please check backend MongoDB configuration.",
  });
};

// Middleware - CORS configuration (must be before bodyParser)
// Supports both development and production via environment variables
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const isDevelopment = process.env.NODE_ENV !== 'production';
    
    // Development: Allow localhost on any port
    if (isDevelopment) {
      if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
        return callback(null, true);
      }
    }
    
    // Build allowed origins list
    const allowedOrigins = [];
    
    // Add production domains from environment variables
    if (process.env.FRONTEND_URL) {
      allowedOrigins.push(process.env.FRONTEND_URL);
    }
    if (process.env.DASHBOARD_URL) {
      allowedOrigins.push(process.env.DASHBOARD_URL);
    }
    
    // Add additional allowed origins from comma-separated env variable
    if (process.env.ALLOWED_ORIGINS) {
      const additionalOrigins = process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim());
      allowedOrigins.push(...additionalOrigins);
    }
    
    // Development: Add localhost origins
    if (isDevelopment) {
      allowedOrigins.push(
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3003',
        /^http:\/\/192\.168\.\d+\.\d+:\d+$/,  // Allow any 192.168.x.x on any port
        /^http:\/\/10\.\d+\.\d+\.\d+:\d+$/,   // Allow any 10.x.x.x on any port
        /^http:\/\/172\.(1[6-9]|2[0-9]|3[0-1])\.\d+\.\d+:\d+$/ // Allow 172.16-31.x.x on any port
      );
    }
    
    // Check if origin matches any allowed pattern
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return origin === allowed;
      } else if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      if (isDevelopment) {
        console.log('[CORS] Blocked origin:', origin);
      }
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS middleware first (before bodyParser)
// CORS middleware automatically handles OPTIONS preflight requests
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// JWT Middleware to verify token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      username: user.username, 
      email: user.email 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Authentication Routes
app.post("/signup", async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      console.error('[Signup Error] MongoDB not connected. ReadyState:', mongoose.connection.readyState);
      return sendDatabaseUnavailable(res);
    }

    const { email, username, password } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Trim and validate
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    // Validate password length
    if (trimmedPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Validate username length
    if (trimmedUsername.length < 3) {
      return res.status(400).json({ message: "Username must be at least 3 characters long" });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({
      $or: [
        { email: trimmedEmail },
        { username: trimmedUsername }
      ]
    });

    if (existingUser) {
      return res.status(409).json({ 
        message: existingUser.email === trimmedEmail 
          ? "Email already exists" 
          : "Username already exists" 
      });
    }

    // Create new user
    const newUser = new UserModel({
      email: trimmedEmail,
      username: trimmedUsername,
      password: trimmedPassword, // Will be hashed by pre-save hook
    });

    console.log('[Signup] Attempting to save user:', {
      username: trimmedUsername,
      email: trimmedEmail,
      database: mongoose.connection.db?.databaseName,
      connectionState: mongoose.connection.readyState
    });

    const registeredUser = await newUser.save();
    
    // Log successful save for debugging
    console.log('[Signup Success] User saved successfully:', {
      id: registeredUser._id,
      username: registeredUser.username,
      email: registeredUser.email,
      database: mongoose.connection.db?.databaseName,
      collection: 'users',
      createdAt: registeredUser.createdAt
    });
    
    // Generate JWT token
    const token = generateToken(registeredUser);

    return res.status(201).json({ 
      message: "User registered successfully",
      token: token,
      user: {
        id: registeredUser._id,
        username: registeredUser.username,
        email: registeredUser.email
      }
    });
  } catch (error) {
    console.error('[Signup Error]', error.message);
    console.error('[Signup Error Details]', error);
    console.error('[Signup Error Stack]', error.stack);
    console.error('[MongoDB Connection State]', mongoose.connection.readyState);
    console.error('[MongoDB Database]', mongoose.connection.db?.databaseName);
    
    // Handle duplicate key error (MongoDB)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      console.error('[Signup Error] Duplicate key:', field, error.keyValue);
      return res.status(409).json({ 
        message: `${field} already exists` 
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      console.error('[Signup Error] Validation failed:', messages);
      return res.status(400).json({ 
        message: messages.join(', ') || "Validation error"
      });
    }
    
    // Handle save errors
    if (error.name === 'MongoServerError') {
      console.error('[Signup Error] MongoDB server error:', error.message);
      return res.status(500).json({ 
        message: "Database error. Please try again."
      });
    }
    
    return res.status(500).json({ 
      message: "Error registering user. Please try again.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      console.error('[Login Error] MongoDB not connected. ReadyState:', mongoose.connection.readyState);
      return sendDatabaseUnavailable(res);
    }

    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Trim and validate username
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      return res.status(400).json({ message: "Username cannot be empty" });
    }

    // Don't trim password, but check if it's empty
    if (!password || password.length === 0) {
      return res.status(400).json({ message: "Password cannot be empty" });
    }

    // Find user by username or email (case-insensitive for email)
    const user = await UserModel.findOne({
      $or: [
        { username: trimmedUsername },
        { email: trimmedUsername.toLowerCase() }
      ]
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare password (don't trim password for comparison)
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = generateToken(user);

    return res.status(200).json({ 
      message: "Logged in successfully",
      token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('[Login Error]', error.message);
    console.error('[Login Error Details]', error);
    return res.status(500).json({ 
      message: "Error during login. Please try again."
    });
  }
});

app.get("/checkAuth", authenticateToken, async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      console.error('[CheckAuth Error] MongoDB not connected. ReadyState:', mongoose.connection.readyState);
      return sendDatabaseUnavailable(res);
    }

    // If middleware passed, token is valid
    const user = await UserModel.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ 
      authenticated: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('[CheckAuth Error]', error.message);
    return res.status(500).json({ 
      authenticated: false,
      message: "Error checking authentication" 
    });
  }
});

// Protected Routes - Trading Data
app.get("/allHoldings", authenticateToken, async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      console.error('[AllHoldings Error] MongoDB not connected. ReadyState:', mongoose.connection.readyState);
      return sendDatabaseUnavailable(res);
    }

    const allHoldings = await HoldingsModel.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(allHoldings);
  } catch (error) {
    console.error('[AllHoldings Error]', error.message);
    res.status(500).json({ message: "Error fetching holdings" });
  }
});

app.get("/allPositions", authenticateToken, async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      console.error('[AllPositions Error] MongoDB not connected. ReadyState:', mongoose.connection.readyState);
      return sendDatabaseUnavailable(res);
    }

    const allPositions = await PositionsModel.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(allPositions);
  } catch (error) {
    console.error('[AllPositions Error]', error.message);
    res.status(500).json({ message: "Error fetching positions" });
  }
});

app.get("/allOrders", authenticateToken, async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      console.error('[AllOrders Error] MongoDB not connected. ReadyState:', mongoose.connection.readyState);
      return sendDatabaseUnavailable(res);
    }

    const allOrders = await OrdersModel.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(allOrders);
  } catch (error) {
    console.error('[AllOrders Error]', error.message);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

app.post("/newOrder", authenticateToken, async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      console.error('[NewOrder Error] MongoDB not connected. ReadyState:', mongoose.connection.readyState);
      return sendDatabaseUnavailable(res);
    }

    const { name, qty, price, mode } = req.body;

    if (!name || qty === undefined || price === undefined || !mode) {
      return res.status(400).json({ message: "All order fields are required" });
    }

    // Validate data types
    if (typeof qty !== 'number' || qty <= 0) {
      return res.status(400).json({ message: "Quantity must be a positive number" });
    }

    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ message: "Price must be a positive number" });
    }

    const newOrder = new OrdersModel({
      name: String(name),
      qty: Number(qty),
      price: Number(price),
      mode: String(mode).toUpperCase(),
      userId: req.user.id, // Associate order with user
    });

    await newOrder.save();
    res.status(201).json({ message: "Order saved successfully", order: newOrder });
  } catch (error) {
    console.error('[NewOrder Error]', error.message);
    res.status(500).json({ message: "Error saving order", error: error.message });
  }
});

// Database connection with better error handling
mongoose.connection.on('connected', () => {
  console.log('MongoDB Connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB Connection Error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB Disconnected');
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    // Connection success is logged by the 'connected' event listener above
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    // Don't exit process, let server start and retry
    setTimeout(connectDB, 5000); // Retry after 5 seconds
  }
};

// Start server
app.listen(PORT, async () => {
  console.log(`App started on port ${PORT}`);
  await connectDB();
  // Log database name for debugging
  if (mongoose.connection.db) {
    console.log(`Database name: ${mongoose.connection.db.databaseName}`);
    console.log(`Collections: ${(await mongoose.connection.db.listCollections().toArray()).map(c => c.name).join(', ')}`);
  }
});
