const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('MongoDB is connected!');
  }
});

require('./job.model');
require('./user.model');
