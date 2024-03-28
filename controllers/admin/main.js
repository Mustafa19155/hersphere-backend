const Promotion = require("../../models/promotion");
const Job = require("../../models/job");
const User = require("../../models/user");
const Post = require("../../models/post");
const Transaction = require("../../models/transaction");
const Workplace = require("../../models/workplace");

const mongoose = require("mongoose");

exports.getAllPromotions = async (req, res, next) => {
  try {
    const promotions = await Promotion.find().populate(
      "userID influencerID transactionID reviewID"
    );
    return res.status(200).json(promotions);
  } catch (err) {
    next(err);
  }
};

exports.getPromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.findById(req.params.id).populate(
      "userID influencerID transactionID reviewID"
    );
    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }
    return res.status(200).json(promotion);
  } catch (err) {
    next(err);
  }
};

exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate(
      "workplaceID employee.userID reviewID"
    );
    return res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
};

exports.getJob = async (req, res, next) => {
  try {
    // const job = await Job.findById(req.params.id).populate(
    //   "workplaceID employee.userID reviewID"
    // );
    const job = await Job.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: "workplaces",
          localField: "workplaceID",
          foreignField: "_id",
          as: "workplaceID",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "employee.userID",
          foreignField: "_id",
          as: "employee.userID",
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "reviewID",
          foreignField: "_id",
          as: "reviewID",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "workplaceID.createdBy",
          foreignField: "_id",
          as: "userID",
        },
      },
      {
        $unwind: {
          path: "$userID",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: "$workplaceID",
      },
      {
        $unwind: {
          path: "$employee.userID",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$reviewID",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    return res.status(200).json(job[0]);
  } catch (err) {
    next(err);
  }
};

exports.getDashboardData = async (req, res, next) => {
  try {
    const users = await User.find({});
    const workplaces = await Workplace.find({});
    const transactions = await Transaction.find({});

    // get users joined in last 7 days group by date
    const usersJoined = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    // get posts by grouping them by platform
    const posts = await Post.aggregate([
      {
        $group: {
          _id: "$platform",
          count: { $sum: 1 },
        },
      },
    ]);

    res.send({
      startupsCount: users.filter((user) => user._doc.userType == "startup")
        .length,
      influencersCount: users.filter(
        (user) => user._doc.userType == "influencer"
      ).length,
      workplacesCount: workplaces.length,
      revenue: transactions.reduce((acc, curr) => acc + curr.amount, 0),
      last7DaysUsers: usersJoined,
      posts: posts,
    });
  } catch (err) {
    next(err);
  }
};
