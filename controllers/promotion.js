const Promotion = require("../models/promotion");
const Transaction = require("../models/transaction");

exports.createPromotion = async (req, res, next) => {
  try {
    const transaction = new Transaction({
      userID: req.userId,
      amount: req.body.amount,
      type: req.body.paymentMethod,
      reason: "Promotion Payment",
    });

    await transaction.save();

    const promotion = new Promotion({
      ...req.body,
      transactionID: transaction._id,
      deadline: new Date(
        Date.now() + req.body.requirements.days * 24 * 60 * 60 * 1000
      ),
      userID: req.userId,
    });

    await promotion.save();

    res.send(promotion);
  } catch (err) {
    next(err);
  }
};

exports.acceptPromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(
      req.params.id,
      { status: "not-started" },
      { new: true }
    );
    res.send(promotion);
  } catch (err) {
    next(err);
  }
};

exports.rejectPromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    res.send(promotion);
  } catch (err) {
    next(err);
  }
};

exports.startPromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(
      req.params.id,
      { status: "started", startedOn: Date.now() },
      { new: true }
    );
    res.send(promotion);
  } catch (err) {
    next(err);
  }
};

exports.deletePromotion = async (req, res, next) => {
  try {
    await Promotion.findByIdAndDelete(req.params.id);
    res.send("Promotion deleted successfully");
  } catch (err) {
    next(err);
  }
};

exports.getPromotionRequests = async (req, res, next) => {
  try {
    const promotions = await Promotion.find({
      status: "pending",
      influencerID: req.userId,
    }).populate("userID influencerID transactionID");
    res.send(promotions);
  } catch (err) {
    next(err);
  }
};

exports.getPromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.findById(req.params.id).populate(
      "userID influencerID transactionID"
    );
    res.send(promotion);
  } catch (err) {
    next(err);
  }
};

exports.getPromotions = async (req, res, next) => {
  try {
    console.log(req.userId);
    const promotions = await Promotion.find({
      $or: [{ userID: req.userId }, { influencerID: req.userId }],
    }).populate("userID influencerID transactionID");
    res.send(
      promotions.filter(
        (promotion) =>
          promotion.status != "rejected" && promotion.influencerID != null
      )
    );
  } catch (err) {
    next(err);
  }
};

exports.getPendingRequests = async (req, res, next) => {
  try {
    const promotions = await Promotion.find({
      status: "pending",
      influencerID: req.userId,
    }).populate("userID influencerID transactionID");
    res.send(promotions);
  } catch (err) {
    next(err);
  }
};
