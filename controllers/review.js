const Review = require("../models/review");

exports.addReview = async (req, res, next) => {
  try {
    const review = await Review.create({ ...req.body, givenBy: req.userId });
    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};
