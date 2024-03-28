const mongoose = require("mongoose");

const { Schema } = mongoose;

const TransactionSchema = new Schema(
  {
    userID: { type: mongoose.Types.ObjectId, ref: "User" },
    amount: { type: Number },
    type: { type: String, enum: ["card", "wallet"] },
    reason: { type: String },
    direction: { type: String, enum: ["in", "out"], default: "in" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
