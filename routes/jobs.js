const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job");

// Create a new job
router.post("/", jobController.createJob);

router.get("/", jobController.getAllJobs);

// Get all jobs of workplace
router.get("/workplace/:id", jobController.getAllWorkplaceJobs);

// Get a specific job by ID
router.get("/:id", jobController.getJobById);

// Update a job by ID
router.put("/:id", jobController.updateJobById);

// Delete a job by ID
router.delete("/:id", jobController.deleteJobById);

module.exports = router;
