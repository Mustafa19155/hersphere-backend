const mongoose = require("mongoose");

const { Schema } = mongoose;

const WalletSchema = new Schema({
  userID: { type: mongoose.Types.ObjectId, ref: "User" },
  balance: { type: Number, default: 0 },
  cards: [
    {
      cardNumber: { type: String },
      expiryDate: { type: String },
      cvv: { type: String },
      cardHolderName: { type: String },
    },
  ],
});

module.exports = mongoose.model("Wallet", WalletSchema);
