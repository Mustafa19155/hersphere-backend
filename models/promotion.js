const mongoose = require("mongoose");

const { Schema } = mongoose;

const PromotionSchema = new Schema(
  {
    userID: { type: mongoose.Types.ObjectId, ref: "User" },
    platforms: [{ type: String, enum: ["facebook", "instagram", "youtube"] }],
    description: { type: String },
    category: { type: String },
    requirements: {
      likes: { type: Number },
      comments: { type: Number },
      days: { type: Number },
    },
    transactionID: { type: mongoose.Types.ObjectId, ref: "Transaction" },
    allowInfluencerToAddData: { type: Boolean, default: true },
    influencerID: { type: mongoose.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["started", "not-started", "rejected", "pending", "failed"],
      default: "pending",
    },
    content: {
      facebook: {},
      youtube: {},
    },
    startedOn: { type: Date },
    completedOn: { type: Date },
    deadline: { type: Date },
    reviewID: { type: mongoose.Types.ObjectId, ref: "Review" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Promotion", PromotionSchema);
