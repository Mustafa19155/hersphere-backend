const User = require("../../models/user");
const Job = require("../../models/job");
const Workplace = require("../../models/workplace");
const Promotion = require("../../models/promotion");

exports.blockUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      isBlocked: true,
    });
    return res.status(200).json({ message: "User blocked successfully" });
  } catch (err) {
    next(err);
  }
};

exports.unblockUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      isBlocked: false,
    });
    return res.status(200).json({ message: "User unblocked successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let jobs;
    let workplaces;

    if (user.userType == "influencer") {
      jobs = await Job.find({
        "employee.userID": user._id,
      });
    } else {
      workplaces = await Workplace.aggregate([
        {
          $match: {
            createdBy: user._id,
          },
        },
        {
          $lookup: {
            from: "jobs",
            localField: "_id",
            foreignField: "workplaceID",
            as: "jobs",
          },
        },
      ]);
    }

    const promotions = await Promotion.find({
      $or: [{ influencerID: user._id }, { startupID: user._id }],
    }).populate("transactionID influencerID reviewID userID");

    return res.status(200).json({ ...user._doc, jobs, workplaces, promotions });
  } catch (err) {
    next(err);
  }
};

exports.getUsersWithHighestSuccessScore = async (req, res, next) => {
  try {
    // get all promotions and group by influencerID
    const promotions = await Promotion.aggregate([
      {
        $match: {
          status: {
            $nin: ["not-started", "started", "pending", "rejected"], // Exclude promotions with these statuses
          },
        },
      },

      {
        $group: {
          _id: "$influencerID", // Group by influencerID
          all: { $sum: 1 }, // Count all promotions for each influencer
          completed: {
            // Count completed promotions for each influencer
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
            },
          },
        },
      },
      {
        $lookup: {
          from: "users", // Name of the collection to perform the lookup
          localField: "_id", // Field from the current collection (promotions) to match with foreignField
          foreignField: "_id", // Field from the foreign collection (influencers) to match with localField
          as: "influencer", // Name of the field to store the result of the lookup
        },
      },
      {
        $unwind: { path: "$influencer" },
      },
      {
        $project: {
          _id: 0, // Exclude _id field from the output
          influencerID: "$_id", // Rename _id as influencerID
          all: 1, // Include all promotions count in the output
          completed: 1, // Include completed promotions count in the output
          influencer: 1, // Include influencer details in the output
          successScore: {
            $divide: ["$completed", "$all"], // Calculate success score by dividing completed promotions by all promotions
          },
        },
      },
      {
        $sort: { successScore: -1 }, // Sort by successScore in descending order
      },
      {
        $limit: 5, // Limit the results to 5 users
      },
    ]);

    res.send(promotions);
  } catch (err) {
    next(err);
  }
};
