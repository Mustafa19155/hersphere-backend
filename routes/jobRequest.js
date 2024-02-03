const express = require("express");
const router = express.Router();
const jobRequestController = require("../controllers/jobRequests");

// Create a new job request
router.post("/", jobRequestController.createJobRequest);

// Get all job requests for a specific user
router.get("/user/:id", jobRequestController.getJobRequestsByUser);

// Update the status of a job request
router.put("/:id/update-status", jobRequestController.updateJobRequestStatus);

router.delete("/:id", jobRequestController.deleteJobRequest);

module.exports = router;
