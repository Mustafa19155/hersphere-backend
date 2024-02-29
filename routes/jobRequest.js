const express = require("express");
const router = express.Router();
const jobRequestController = require("../controllers/jobRequests");

// Create a new job request
router.post("/", jobRequestController.createJobRequest);

// Get all job requests for a specific user
router.get("/user", jobRequestController.getJobRequestsByUser);

// Get all jobs of all workplaces of user
router.get("/:status", jobRequestController.getJobRequestsForUser);

// Update the status of a job request
router.put("/:id/update-status", jobRequestController.updateJobRequestStatus);

// accept request
router.put("/:id/accept", jobRequestController.acceptJobRequest);

router.delete("/:id", jobRequestController.deleteJobRequest);

module.exports = router;
