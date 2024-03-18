const Promotion = require("../models/promotion");

exports.createPromotion = async (req, res, next) => {
  try {
    const promotion = new Promotion({
      ...req.body,
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
      { status: "started" },
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
