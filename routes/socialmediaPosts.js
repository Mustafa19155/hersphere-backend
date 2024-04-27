var express = require("express");
const socialmediaController = require("../controllers/socialmediaPosts");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const type = upload.single("file");

const router = express.Router();

router.post("/facebook", socialmediaController.uploadToFacebook);
router.post("/instagram", socialmediaController.uploadToInsta);
router.post("/youtube", type, socialmediaController.uploadToYoutube);
router.post("/details/:postID", socialmediaController.getPostDetails);
router.get(
  "/postsOfRequest/:promotionId",
  socialmediaController.getPostsDetailsByRequest
);

module.exports = router;
