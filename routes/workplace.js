const express = require("express");
const router = express.Router();
const workplaceController = require("../controllers/workplace");
const { verifyJWT } = require("../middlewares/verifyJwt");

// Create a new workplace
router.post("/", verifyJWT, workplaceController.createWorkplace);

// Get all workplaces of user
router.get("/", verifyJWT, workplaceController.getUserWorkplaces);

// Get a specific workplace by ID
router.get("/:id", verifyJWT, workplaceController.getWorkplaceById);

// Update a workplace by ID
router.put("/:id", verifyJWT, workplaceController.updateWorkplaceById);

// Delete a workplace by ID
router.delete("/:id", verifyJWT, workplaceController.deleteWorkplaceById);

module.exports = router;
