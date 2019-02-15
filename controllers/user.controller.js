const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
  new User({
    username: req.body.username,
    password: req.body.password,
  }).save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      if (err.code == 11000) {
        res
          .status(422)
          .send(['Username was already found, use a different username!']);
      }
    }
  });
};

module.exports.authenticate = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      //err passport middleware
      return res.status(400).json(err);
    } else if (user) {
      //registered user
      return res.status(200).json({ token: user.generateJwt() });
    } else {
      // unknown user/wrong password
      return res.status(404).json(info);
    }
  })(req, res);
};

module.exports.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id }, (err, user) => {
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "Username wasn't found" });
    } else {
      return res.status(200).json({
        status: true,
        user: _.pick(user, ['username']),
      });
    }
  });
};
