require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

require("./config/passport");

const app = express();

/* ---------------------------
   MIDDLEWARE
----------------------------*/

// Parse JSON
app.use(express.json());

// CORS (React frontend)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

// Cookie parser
app.use(cookieParser());

// Session for Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, 
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


/* ---------------------------
   DATABASE CONNECTION
----------------------------*/

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });


/* ---------------------------
   ROUTES
----------------------------*/

// Authentication Routes
app.use("/api/auth", require("./routes/authRoutes"));


/* ---------------------------
   TEST ROUTE
----------------------------*/

app.get("/", (req, res) => {
  res.send("Authentication API Running");
});


/* ---------------------------
   SERVER START
----------------------------*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});