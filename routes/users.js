var express = require("express");
const authController = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");

var router = express.Router();

router.get("/facebook-pages", authController.getFacebookPages);
router.get("/youtube-details", authController.getYoutubeDetails);
module.exports = router;
