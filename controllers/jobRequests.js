const mongoose = require("mongoose");
const JobRequest = require("../models/jobRequest");
const Workplace = require("../models/workplace");

// Create a new job request
exports.createJobRequest = async (req, res, next) => {
  try {
    const { userId } = req;
    const jobRequest = await JobRequest.create({ ...req.body, userID: userId });

    res.status(201).json(jobRequest);
  } catch (error) {
    next(error);
  }
};

// Get all jobs of all workplaces of user

exports.getJobRequestsForUser = async (req, res, next) => {
  try {
    const { userId } = req;

    const jobRequests = await Workplace.aggregate([
      {
        $match: {
          createdBy: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "jobs", // The name of the Job collection
          localField: "_id",
          foreignField: "workplaceID",
          as: "jobs",
        },
      },
      {
        $lookup: {
          from: "job-requests", // The name of the JobRequest collection
          localField: "jobs._id",
          foreignField: "jobID",
          as: "jobRequests",
        },
      },
      {
        $lookup: {
          from: "users",
          let: { requests: "$jobRequests" },
          pipeline: [
            { $match: { $expr: { $in: ["$_id", "$$requests.userID"] } } },
            {
              $project: {
                password: 0,
              },
            },
          ],
          as: "requestUsers",
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          startDate: 1,
          endDate: 1,
          totalMembers: 1,
          categories: 1,
          jobRequests: {
            $map: {
              input: "$jobRequests",
              as: "i",
              in: {
                jobID: {
                  $first: {
                    $filter: {
                      input: "$jobs",
                      cond: { $eq: ["$$this._id", "$$i.jobID"] },
                    },
                  },
                },
                description: "$$i.description",
                status: "$$i.status",
                userID: {
                  $first: {
                    $filter: {
                      input: "$requestUsers",
                      cond: { $eq: ["$$this._id", "$$i.userID"] },
                    },
                  },
                },
              },
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          workplace: { $first: "$$ROOT" },
        },
      },
    ]);
    res.status(200).json(jobRequests);
  } catch (error) {
    next(error);
  }
};

// Get all job requests for a specific user
exports.getJobRequestsByUser = async (req, res, next) => {
  try {
    const { userId } = req;

    const jobRequests = await JobRequest.find({
      userID: mongoose.Types.ObjectId(userId),
    });

    res.status(200).json(jobRequests);
  } catch (error) {
    next(error);
  }
};

// Update the status of a job request
exports.updateJobRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedJobRequest = await JobRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedJobRequest) {
      return res.status(404).json({ message: "Job request not found" });
    }

    res.status(200).json(updatedJobRequest);
  } catch (error) {
    next(error);
  }
};

exports.deleteJobRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    const jobRequest = await JobRequest.findOneAndDelete({
      _id: id,
      userID: userId,
    });
    if (!jobRequest) {
      return res.status(404).json({ message: "jobRequest not found" });
    }
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
