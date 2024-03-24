var express = require("express");
const authController = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");
const { verifyJWT } = require("../middlewares/verifyJwt");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", verifyJWT, authController.getUser);
router.get("/facebook-pages", authController.getFacebookPages);
router.get("/instagram-pages", authController.getInstagramPages);
router.get("/youtube-details", authController.getYoutubeDetails);
router.post("/google-login", authController.loginWithGoogle);
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post(
  "/verify-gender",
  upload.single("image"),
  authController.verifyGender
);
router.put("/update", verifyJWT, authController.updateProfile);
router.put("/password", verifyJWT, authController.updatePassword);
router.get(
  "/job-request/:userId",
  verifyJWT,
  authController.getUserJobRequestDetails
);
router.get("/recommended", verifyJWT, authController.recommendedInfluencers);
router.get(
  "/influencer/request/:id",
  verifyJWT,
  authController.getInfluencerProfileForRequest
);
router.get("/influencer/search", verifyJWT, authController.searchInfluencers);

router.get("/check-login", verifyJWT, authController.checkLogin);

module.exports = router;
