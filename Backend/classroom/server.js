const express = require("express");
const app = express();
const users = require("./routes/user.js");      //Requires user.js from routes file
const posts = require("./routes/post.js");      //Requires post.js from routes file
// const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash")
const path = require("path")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/*
//Cookies

app.use(cookieParser("secretcode"));


app.get("/getsignedcookie", (req, res) => {
    res.cookie("made-in", "India", {signed: true})
    res.send("signed Cookie sent");
})

app.get("/verify", (req, res) => {
    console.log(req.signedCookies);
})


app.get("/greet", (req, res) => {
    let {name = "anonumous"} = req.cookies;
    res.send(`hi, ${name}`)
})

app.get("/getcookies", (req, res) => {
    res.cookie("greet", "namaste")
    res.cookie("madeIn", "India")
    res.send("sent you some cookies");
})


app.get("/", (req, res) => {
    console.dir(req.cookies);
    res.send("Hi, I am root");
})

// For users routes
app.use("/users", users);    //It shows our path to use users route

// For posts routes
app.use("/posts", posts);
*/

//       Express Sessions
const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};


app.use(session(sessionOptions));
app.use(flash());


//middleware for flash 
app.use((req, res, next) => {
    res.locals.successMsg  =  req.flash("success");
    res.locals.errorMsg  =  req.flash("error");
    next()
})

//we can store info in req.session and can access it through another route
// flash is used to flash/show some msg for a second then it disappears after refreshing the page
app.get("/register", (req, res) => {
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    if(name === "anonymous") {
        req.flash("error", "user not registered");
    } else {
        req.flash("success", "user registered successfilly!");
    }
    res.redirect("/hello");
})

app.get("/hello", (req, res) => {
    res.render("page.ejs", {name: req.session.name })
})











// req.session tracks a single session that how many times it sends the request
// app.get("/reqcount", (req, res) => {
//     if(req.session.count){
//         req.session.count++;
//     } else {
//         req.session.count = 1;
//     }
//     res.send(`You sent a request ${req.session.count} times`)
// })


// app.get("/test", (req, res) => {
//     res.send("test successful")
// })



app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

