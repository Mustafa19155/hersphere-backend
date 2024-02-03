const mongoose = require("mongoose");
const JobRequest = require("../models/jobRequest");

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
