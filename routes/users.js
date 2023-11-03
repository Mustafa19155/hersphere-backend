var express = require("express");
const authController = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");
const { verifyJWT } = require("../middlewares/verifyJwt");

var router = express.Router();

router.get("/", verifyJWT, authController.getUser);
router.get("/facebook-pages", authController.getFacebookPages);
router.get("/instagram-pages", authController.getInstagramPages);
router.get("/youtube-details", authController.getYoutubeDetails);
router.post("/google-login", authController.loginWithGoogle);
router.post("/login", authController.login);
router.post("/register", authController.register);
router.put("/update", verifyJWT, authController.updateProfile);
router.put("/password", verifyJWT, authController.updatePassword);
module.exports = router;
