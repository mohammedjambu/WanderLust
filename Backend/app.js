if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");
const cors = require("cors");
const cookieParser = require("cookie-parser"); 

const ExpressError = require("./utils/ExpressError.js");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const bookingRoutes = require("./routes/booking.js");
const coordinateRoutes = require('./routes/coordinates');

// MongoDB connection
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

mongoose.connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());



// CORS setup — allow frontend to send cookies
app.use(cors({
  origin: "http://localhost:5173", // React dev server
  credentials: true
}));

// Session setup
const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
  }
};
app.use(session(sessionOptions));
app.use(flash());

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Custom middleware (optional for debugging / auth info)
// app.js (add after middleware)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/listings", listingRouter);
app.use("/api/listings/:id/reviews", reviewRouter);
app.use("/api/auth", userRouter); // Updated route for user login/signup/logout
app.use("/api/bookings", bookingRoutes); // Booking routes
app.use('/api', coordinateRoutes); // So this will handle: /api/get-coordinates


// 404 handler
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});


// Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  if (req.originalUrl.startsWith("/api")) {
    return res.status(status).json({ error: message });
  }

  // Optional: For any EJS-based fallback
  res.status(status).send(message);
});

// Start server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
