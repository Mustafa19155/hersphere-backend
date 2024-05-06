const mongoose = require("mongoose");

const { Schema } = mongoose;

const ReportSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reportedUserID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reason: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);
