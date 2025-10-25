// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const PORT = process.env.PORT || 3002;
// const uri = process.env.MONGO_URL;
// const HoldingsModel = require("./model/HoldingsModel");
// const PositionsModel = require("./model/PositionsModel");
// const OrdersModel = require("./model/OrdersModel");

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// app.get("/allHoldings", async (req, res) => {
//     let allHoldings = await HoldingsModel.find({});
//     res.json(allHoldings);
// });

// app.get("/allPositions", async (req, res) => {
//     let allPositions = await PositionsModel.find({});
//     res.json(allPositions);
// });

// app.post("/newOrder", async (req, res) => {
//     let newOrder = new OrdersModel({
//         name: req.body.name,
//         qty: req.body.qty,
//         price: req.body.price,
//         mode: req.body.mode,
//     });

//     newOrder.save();
//     res.send("Order saved");
// });

// app.listen(PORT, () => {
//     console.log("App is listening on port 3002");
//     mongoose.connect(uri);
//     console.log("DB created");
// });

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

//login setup
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local");
const { UserModel } = require("./model/UserModel");

const bodyParser = require("body-parser");
const cors = require("cors");

const sessionItems = {
  secret: "zerodha application",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));
app.use(bodyParser.json());
app.use(session(sessionItems));

app.use(passport.initialize()); //for any request initialize the passort id
app.use(passport.session()); //identify the users as the brows from page to page
passport.use(new LocalStrategy(UserModel.authenticate())); //Jitne bhi user aaye authenticate with Localstrategy

passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.post("/signup", async (req, res) => {
  try {
    let { email, username, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let newUser = new UserModel({
      email: email,
      username: username,
    });
    let registeredUser = await UserModel.register(newUser, password);
    
    req.login(registeredUser, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging in after signup" });
      }
      return res.status(200).json({ 
        message: "User registered successfully",
        user: {
          id: registeredUser._id,
          username: registeredUser.username,
          email: registeredUser.email
        }
      });
    });
  } catch (error) {
    console.error('[Signup Error]', error.message);
    if (error.name === 'UserExistsError') {
      return res.status(409).json({ message: "Username already exists" });
    }
    return res.status(500).json({ message: "Error registering user" });
  }
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ 
    message: "Logged in successfully",
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email
    }
  });
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
});

app.get("/checkAuth", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ 
      authenticated: true,
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email
      }
    });
  }
  res.status(401).json({ authenticated: false });
});

// app.get("/demo", async (req, res) => {
//   let demoUser = new UserModel({
//     email: "ik@gmail.com",
//     username: "@ik",
//   });
//   let newUser = await UserModel.register(demoUser, "demo");
//   console.log(newUser);
//   res.send(newUser);
// });

// app.get("/addHoldigs", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHoldings = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//     });
//     newHoldings.save();
//   });
//   res.send("holdings data saved");
// });

app.post("/newOrder", async (req, res) => {
    try {
      let newOrder = new OrdersModel({
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price,
        mode: req.body.mode,
      });
  
      await newOrder.save();
      res.send("Order saved");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error saving order");
    }
  });
  

app.get("/allHoldings", async (req, res) => {
  let allholdings = await HoldingsModel.find({});
  res.json(allholdings);
});

app.get("/allPositions", async (req, res) => {
  let allpositions = await PositionsModel.find({});
  res.json(allpositions);
});

app.listen(PORT, async () => {
  console.log("App started on port 3002");
  await mongoose
    .connect(uri)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));
});