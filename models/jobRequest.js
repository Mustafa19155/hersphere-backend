const mongoose = require("mongoose");

const { Schema } = mongoose;

const JobRequestSchema = new Schema(
  {
    jobID: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
    },
    userID: { type: mongoose.Types.ObjectId, ref: "User" },
    description: { type: String },
    status: {
      type: String,
      enum: ["accepted", "rejected", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job-Request", JobRequestSchema);
