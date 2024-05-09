const mongoose = require("mongoose");
const Job = require("../models/job");
const Workplace = require("../models/workplace");
const JobRequest = require("../models/jobRequest");
const Chatroom = require("../models/chatroom");
const Review = require("../models/review");
const User = require("../models/user");
const Transaction = require("../models/transaction");

// Create a new job
exports.createJob = async (req, res, next) => {
  try {
    const job = await Job.create(req.body);

    console.log(req.body.paymentMethod == "wallet");
    if (req.body.paymentMethod == "wallet") {
      const user = await User.findById(req.userId);
      user.balance -= req.body.price;
      await user.save();
    }
    await Transaction.create({
      userID: req.userId,
      amount: req.body.price,
      type: req.body.paymentMethod,
      reason: "Job Payment",
    });

    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

exports.getAllJobs = async (req, res, next) => {
  try {
    const { userId } = req;

    // Step 2: Use aggregate to add application status for each job
    const userWorkplaces = await Job.aggregate([
      {
        $match: {
          "employee.userID": mongoose.Types.ObjectId(userId), // User is already employed
        },
      },
      {
        $group: {
          _id: "$workplaceID", // Group by workplaceID
        },
      },
    ]);

    // Extract workplaceIDs from the user's workplaces
    const userWorkplaceIDs = userWorkplaces.map((workplace) => workplace._id);

    const skillPatterns = req.query.skills
      .split(",")
      .map((skill) => new RegExp(skill, "i"));

    // Use $nin (not in) operator to exclude jobs from workplaces where the user is already employed
    const jobsWithStatus = await Job.aggregate([
      {
        $match: {
          "employee.userID": null, // Job is not taken
          skillset: { $in: skillPatterns }, // Job matches required skills
          workplaceID: { $nin: userWorkplaceIDs }, // Exclude jobs from workplaces where the user is already employed
        },
      },
      // Populate workplace
      {
        $lookup: {
          from: "workplaces", // The name of the Workplace collection
          localField: "workplaceID", // The field in the Job collection
          foreignField: "_id", // The field in the Workplace collection
          as: "workplaceID",
        },
      },
      // Deconstruct the array from the previous lookup stage
      { $unwind: "$workplaceID" },
      // Find review from review collection based on jobID
      {
        $lookup: {
          from: "job-requests", // The name of the JobRequest collection
          let: { jobId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$jobID", "$$jobId"] },
                    { $eq: ["$userID", userId] }, // Use the converted ObjectId directly
                  ],
                },
              },
            },
          ],
          as: "applications",
        },
      },
      // Add field to check if the user has applied for the job
      {
        $addFields: {
          hasApplied: { $gt: [{ $size: "$applications" }, 0] }, // Check if the array is not empty
        },
      },
    ]);
    res.send(jobsWithStatus);
  } catch (error) {
    next(error);
  }
};

// Get all jobs of workplace
exports.getAllWorkplaceJobs = async (req, res, next) => {
  try {
    // const jobs = await Job.find({ workplaceID: req.params.id });

    // populate jobs with review
    const jobs = await Job.aggregate([
      {
        $match: {
          workplaceID: mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "jobID",
          as: "review",
        },
      },
      {
        $unwind: {
          path: "$review",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

// Get a specific job by ID
exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate("workplaceID");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const review = await Review.findOne({ jobID: req.params.id });

    // check if user has applied for the job
    const { userId } = req;
    const jobRequest = await JobRequest.findOne({
      jobID: req.params.id,
      userID: userId,
    });

    res.status(200).json({ ...job._doc, review, hasApplied: !!jobRequest });
  } catch (error) {
    next(error);
  }
};

// Update a job by ID
exports.updateJobById = async (req, res, next) => {
  try {
    const { userId } = req;

    const workplace = await Workplace.findOne({ createdBy: userId });

    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!job || !workplace) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

// Delete a job by ID
exports.deleteJobById = async (req, res, next) => {
  try {
    const { userId } = req;

    const workplace = await Workplace.findOne({ createdBy: userId });

    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job || !workplace) {
      return res.status(404).json({ message: "Job not found" });
    }

    // refund to user wallet
    const user = await User.findById(req.userId);
    user.balance += job.price;
    await user.save();

    await Transaction.create({
      userID: req.userId,
      amount: job.price,
      type: "wallet",
      reason: "Job Refund",
      direction: "out",
    });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

// Get jobs of influencer
exports.getJobsOfInfluencer = async (req, res, next) => {
  try {
    const { userId } = req;

    const jobs = await Job.find({ "employee.userID": userId }).populate(
      "workplaceID"
    );

    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      const review = await Review.findOne({ jobID: job._id });
      const chatroom = await Chatroom.findOne({
        workplaceID: job.workplaceID._id,
      });
      jobs[i] = {
        ...job._doc,
        review,
        chatroomID: { ...chatroom._doc },
      };
    }

    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

exports.addReview = async (req, res, next) => {
  try {
    const { userId } = req;
    const job = await Job.findById(req.params.id).populate("workplaceID");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (job.workplaceID.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized" });
    }
    job.review = { ...req.body, date: Date.now() };
    // await job.save();
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

// get open jobs of workplace
exports.getOpenJobsOfWorkplace = async (req, res, next) => {
  try {
    const jobs = await Job.find({
      workplaceID: req.params.id,
      "employee.userID": null,
    });
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};
