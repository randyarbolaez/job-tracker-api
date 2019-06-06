const mongoose = require('mongoose');

const Job = mongoose.model('Job');

module.exports.jobCreate = (req, res, next) => {
  new Job({
    jobListingUrl: req.body.jobListingUrl,
    companyName: req.body.companyName,
    companyNameUrl: req.body.companyNameUrl,
    jobPosting: req.body.jobPosting,
    notes: req.body.notes,
    location: req.body.location,
    personOfContact: req.body.personOfContact,
    personOfContactUrl: req.body.personOfContactUrl,
    mailToLink: req.body.mailToLink,
    user: req._id,
  }).save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      res.send(err);
    }
  });
};

module.exports.jobList = (req, res, next) => {
  Job.find({ user: req._id }, (err, myJobs) => {
    if (!err) {
      res.send(myJobs);
    }
  });
};

module.exports.jobRemove = (req, res, next) => {
  Job.findByIdAndRemove(req.params.job)
    .then(Job => {
      res.json('Job Listing was Deleted');
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.jobUpdate = (req, res, next) => {
  var updates = {
    jobListingUrl: req.body.jobListingUrl,
    companyName: req.body.companyName,
    companyUrl: req.body.companyUrl,
    jobPosting: req.body.jobPosting,
    notes: req.body.notes,
    location: req.body.location,
    personOfContact: req.body.personOfContact,
    personOfContactUrl: req.body.personOfContactUrl,
    mailToLink: req.body.mailToLink,
  };

  Job.findByIdAndUpdate(req.params.id, updates)
    .then(job => {
      res.json({ message: 'Job was updated succesfully' });
    })
    .catch(err => {
      next(err);
    });
};
