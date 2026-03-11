const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

require("dotenv").config();
require("./config/passport");

const app = express();

app.use(express.json());
app.use(cors({
 origin:"http://localhost:3000",
 credentials:true
}));

app.use(cookieParser());

app.use(
session({
 secret:"secret",
 resave:false,
 saveUninitialized:true
})
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"));

app.use("/api/auth",require("./routes/authRoutes"));

app.listen(5000,()=>{
 console.log("Server running on port 5000");
});