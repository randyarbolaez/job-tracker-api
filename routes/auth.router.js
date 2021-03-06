require("dotenv").config();

const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const jwtHelper = require("../config/jwtHelper");

router.post("/signup", (req, res, next) => {
  const salt = bcrypt.genSaltSync(bcryptSalt);

  new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, bcryptSalt)
  }).save((err, doc) => {
    if (!err) {
      passport.authenticate("local", (err, user, info) => {
        const generateJwt = () => {
          return jwt.sign({ _id: doc._id }, process.env.JWT_SECRET, {
            expiresIn: "10d"
          });
        };

        if (err) {
          //err passport middleware
          return res.status(400).json(err);
        } else if (user) {
          //registered user
          return res.status(200).json({ user, token: generateJwt() });
        } else {
          // unknown user/wrong password
          return res.status(404).json(info);
        }
      })(req, res);
    } else {
      if (err.code == 11000) {
        res
          .status(422)
          .send(["Username was already found, use a different username!"]);
      }
      console.log(err);
    }
  });
});

router.post("/authenticate", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    const generateJwt = () => {
      return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "10d"
      });
    };

    if (err) {
      //err passport middleware
      return res.status(400).json(err);
    } else if (user) {
      //registered user
      return res.status(200).json({ user, token: generateJwt() });
    } else {
      // unknown user/wrong password
      return res.status(404).json(info);
    }
  })(req, res);
});

router.get("/userProfile", jwtHelper.verifyJwtToken, (req, res, next) => {
  User.findOne({ _id: req._id }, (err, user) => {
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "Username wasn't found" });
    } else {
      return res.status(200).json({
        status: true,
        user: _.pick(user, ["username"])
      });
    }
  });
});

module.exports.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id }, (err, user) => {
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "Username wasn't found" });
    } else {
      return res.status(200).json({
        status: true,
        user: _.pick(user, ["username"])
      });
    }
  });
};

module.exports = router;
