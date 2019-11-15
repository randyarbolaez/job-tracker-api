require("./config/config");
require("./models/db");
require("./config/passportConfig");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

const app = express();

//middleware
app.use(bodyParser.json());
// app.use(cors());
app.use(passport.initialize());

app.all("*", function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
//middleware

//routes
const auth = require("./routes/auth.router");
app.use("/api", auth);
const job = require("./routes/job.router");
app.use("/api/job", job);
//routes

//start server
app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
// start server
