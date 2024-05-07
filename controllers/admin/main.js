const Promotion = require("../../models/promotion");
const Job = require("../../models/job");
const User = require("../../models/user");
const Post = require("../../models/post");
const Transaction = require("../../models/transaction");
const Workplace = require("../../models/workplace");
const Category = require("../../models/category");
const Report = require("../../models/report");

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
      revenue: transactions.reduce(
        (acc, curr) => (acc + curr.amount ? curr.amount : 0),
        0
      ),
      last7DaysUsers: usersJoined,
      posts: posts,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

exports.getReports = async (req, res, next) => {
  try {
    const reports = await Report.find().populate("userID reportedUserID");
    return res.status(200).json(reports);
  } catch (err) {
    next(err);
  }
};

exports.getReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);
    return res.status(200).json(report);
  } catch (err) {
    next(err);
  }
};

exports.updateReport = async (req, res, next) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({ message: "Report updated successfully" });
  } catch (err) {
    next(err);
  }
};

exports.deleteReport = async (req, res, next) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    return res.status(204).json();
  } catch (err) {
    next(err);
  }
};
