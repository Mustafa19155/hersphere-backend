const Wallet = require("../models/wallet");
const User = require("../models/user");
const Transaction = require("../models/transaction");

exports.getWallet = async (req, res, next) => {
  try {
    const userId = req.userId;

    const wallet = await Wallet.findOne({ userID: userId }).populate("userID");
    return res.send(wallet);
  } catch (err) {
    next(err);
  }
};

exports.addCard = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { cardNumber, expiryDate, cvv, cardHolderName } = req.body;

    const wallet = await Wallet.findOne({ userID: userId });

    wallet.cards.push({ cardNumber, expiryDate, cvv, cardHolderName });

    await wallet.save();

    return res.send(wallet);
  } catch (err) {
    next(err);
  }
};

exports.deleteCard = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { cardNumber } = req.body;

    const wallet = await Wallet.findOne({ userID: userId });

    wallet.cards = wallet.cards.filter(
      (card) => card.cardNumber !== cardNumber
    );

    await wallet.save();

    return res.send(wallet);
  } catch (err) {
    next(err);
  }
};

exports.updateBalance = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { amount } = req.body;

    const wallet = await Wallet.findOne({ userID: userId });

    wallet.balance += amount;

    await wallet.save();

    return res.send(wallet);
  } catch (err) {
    next(err);
  }
};

exports.withdraw = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.balance < req.body.amount) {
      return res.status(400).send("Insufficient balance");
    }

    user.balance -= req.body.amount;

    await user.save();

    const transaction = new Transaction({
      userID: req.userId,
      amount: req.body.amount,
      type: "wallet",
      reason: "Withdraw",
    });

    await transaction.save();

    return res.send(user);
  } catch (err) {
    next(err);
  }
};
