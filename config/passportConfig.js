const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User');

passport.use(
  new localStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      } else if (!user) {
        return done(null, false, { message: `Username isn't registered!` });
      } else if (!user.verifyPassword(password)) {
        return done(null, false, { message: `Wrong password!` });
      } else {
        return done(null, user);
      }
    });
  })
);
