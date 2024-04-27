const controller = require("../controllers/review");

const express = require("express");
const router = express.Router();

router.post("/", controller.addReview);

module.exports = router;
