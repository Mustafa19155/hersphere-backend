var express = require("express");
const socialmediaController = require("../controllers/socialmediaPosts");
const { verifyJWT } = require("../middlewares/verifyJwt");

const router = express.Router();

router.post("/facebook", socialmediaController.uploadToFacebook);
router.post("/instagram", socialmediaController.uploadToInsta);
router.post("/youtube", socialmediaController.uploadToYoutube);
router.post("/details/:postID", socialmediaController.getPostDetails);
module.exports = router;
