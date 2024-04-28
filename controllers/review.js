const Review = require("../models/review");
const Promotion = require("../models/promotion");

exports.addReview = async (req, res, next) => {
  try {
    const review = await Review.create({ ...req.body, givenBy: req.userId });
    if (req.body.requestID) {
      const promotion = await Promotion.findById(req.body.requestID);
      promotion.reviewID = review._id;
      await promotion.save();
    }
    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};
