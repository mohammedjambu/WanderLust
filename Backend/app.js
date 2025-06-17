if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() => {
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);   // Database link 
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true})); 
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:  7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}

// app.get("/", (req, res) => {
//     res.send("Hi, I am root");
// })




const cors = require('cors');

// Configure CORS to allow requests from your frontend origin
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only this origin
  credentials: true, // Allow credentials (cookies, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Your signup route
app.post('/api/auth/signup', (req, res) => {
  const { username, email, password } = req.body;
  // Handle signup logic here (e.g., save to database)
  res.status(201).json({ message: 'User created successfully' });
});






// Using express sessions
app.use(session(sessionOptions));
// Using flash
app.use(flash());

// Using passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// Flash middleware
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    next();
})

//passport demo
// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "delta-student"
//     });

//     //regitser method to enter username passw in the db
//     let registeredUSer = await User.register(fakeUser, "helloworld");
//     res.send(registeredUSer);
// })



// All listings
app.use("/listings", listingRouter);


//All reviews routes
app.use("/listings/:id/reviews", reviewRouter)

//User routes
app.use("/", userRouter);


// Express error
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

// Middleware
app.use((err, req, res, next) => {
    let {statusCode=500, message= "Something went wrong"} = err;
    res.status(statusCode).render("error.ejs", { message } );
    // res.status(statusCode).send(message);
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})