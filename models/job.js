const mongoose = require("mongoose");

const { Schema } = mongoose;

const JobSchema = new Schema(
  {
    workplaceID: {
      type: mongoose.Types.ObjectId,
      ref: "Workplace",
    },
    employee: {
      userID: { type: mongoose.Types.ObjectId, ref: "User" },
      joinedOn: { type: Date },
    },
    workplaceCategoryID: {
      type: String,
    },
    title: { type: String },
    description: { type: String },
    skillset: [{ type: String }],
    price: { type: Number },
    paymentStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "half", "full"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
