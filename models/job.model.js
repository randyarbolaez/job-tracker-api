const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    jobListingUrl: {
      type: String
    },
    companyName: {
      type: String
    },
    companyNameUrl: {
      type: String
    },
    jobPosting: {
      type: String
    },
    notes: {
      type: String
    },
    location: {
      type: String
    },
    personOfContact: {
      type: String
    },
    personOfContactUrl: {
      type: String
    },
    mailToLink: {
      type: String
    },
    user: Schema.Types.ObjectId
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
