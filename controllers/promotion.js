const Promotion = require("../models/promotion");
const Transaction = require("../models/transaction");
const Post = require("../models/post");
const User = require("../models/user");
const axios = require("axios");

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
    }).populate("userID influencerID transactionID reviewID");
    res.send(promotions);
  } catch (err) {
    next(err);
  }
};

exports.getPromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.findById(req.params.id).populate(
      "userID influencerID transactionID reviewID"
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
    }).populate("userID influencerID transactionID reviewID");
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
    }).populate("userID influencerID transactionID reviewID");
    res.send(promotions);
  } catch (err) {
    next(err);
  }
};

exports.completePromotion = async (req, res, next) => {
  try {
    // check if post likes and counts are equal or greater than the requirements
    const promotion = await Promotion.findById(req.params.id);
    const posts = await Post.find({ promotionID: req.params.id });
    const user = await User.findById(req.userId);

    let isCompleted = false;

    for (let post of posts) {
      if (post.platform === "facebook") {
        const facebookPost = await axios.get(
          `https://graph.facebook.com/v12.0/${post.postID}?fields=likes.limit(10).summary(true),comments.limit(10).summary(true)&access_token=${user.facebookPage.access_token}`
        );
        facebookPost.data.likes.summary.total_count >=
          promotion.requirements.likes &&
        facebookPost.data.comments.summary.total_count >=
          promotion.requirements.comments
          ? (isCompleted = true)
          : (isCompleted = false);
      } else if (post.platform === "instagram") {
        const instagramPost = await axios.get(
          `https://graph.facebook.com/v12.0/${post.postID}?fields=like_count,comments_count&access_token=${user.instagramPage.token}`
        );

        instagramPost.data.like_count >= promotion.requirements.likes &&
        instagramPost.data.comments_count >= promotion.requirements.comments
          ? (isCompleted = true)
          : (isCompleted = false);
      } else if (post.platform === "youtube") {
        const youtubePost = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${post.postID}&key=${process.env.YOUTUBE_API_KEY}`
        );

        youtubePost.data.items[0].statistics.likeCount >=
          promotion.requirements.likes &&
        youtubePost.data.items[0].statistics.commentCount >=
          promotion.requirements.comments
          ? (isCompleted = true)
          : (isCompleted = false);
      }
    }
    if (isCompleted) {
      promotion.completedOn = Date.now();
      promotion.status = "completed";
      await promotion.save();
    }
    res.send(promotion);
  } catch (err) {
    next(err);
  }
};
