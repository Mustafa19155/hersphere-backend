const mongoose = require("mongoose");

const { Schema } = mongoose;

const WorkplaceSchema = new Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    name: { type: String },
    description: { type: String },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    totalMembers: {
      type: Number,
    },
    categories: [
      {
        name: { type: String },
        membersCount: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workplace", WorkplaceSchema);
