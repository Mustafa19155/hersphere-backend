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
    allowInfluencerToAddData: { type: Boolean, default: true },
    amount: { type: Number },
    paymentMethod: { type: String, enum: ["wallet", "card"] },
    influencerID: { type: mongoose.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["started", "not-started", "rejected", "pending"],
      default: "pending",
    },
    content: {
      facebook: {},
      youtube: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Promotion", PromotionSchema);
