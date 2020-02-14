const express = require("express");
const router = express.Router();

const Job = require("../models/job.model");
const User = require("../models/user.model");

const jwtHelper = require("../config/jwtHelper");

router.post("/create", jwtHelper.verifyJwtToken, (req, res, next) => {
  let {
    jobListingUrl,
    companyName,
    companyNameUrl,
    jobPosting,
    notes,
    location,
    personOfContact,
    personOfContactUrl,
    mailToLink
  } = req.body;
  new Job({
    jobListingUrl,
    companyName,
    companyNameUrl,
    jobPosting,
    notes,
    location,
    personOfContact,
    personOfContactUrl,
    mailToLink,
    user: req._id
  }).save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      res.send(err);
    }
  });
});

router.get("/joblist", jwtHelper.verifyJwtToken, (req, res, next) => {
  Job.find({ user: req._id })
    .then(allJobs => {
      res.send(allJobs);
    })
    .catch(err => {
      res.send({ err });
    });
});

router.delete("/delete/:id", jwtHelper.verifyJwtToken, (req, res, next) => {
  Job.findById(req.params.id).then(job => {
    if (req._id == job.user) {
      Job.findByIdAndRemove(job.id)
        .then(removedJob => {
          res.send({ message: "Job was deleted", removedJob });
        })
        .catch(err => {
          res.send({ err });
        });
    } else {
      res.send({ message: "Only user can delete job" });
    }
  });
});

module.exports = router;
