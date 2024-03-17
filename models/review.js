const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  givenBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  givenTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  jobID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  requestID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
