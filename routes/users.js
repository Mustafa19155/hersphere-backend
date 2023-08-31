var express = require("express");
const authController = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");

var router = express.Router();

router.get("/admin", authMiddleware.verifyJWT, authController.getUser);
router.put("/single", authMiddleware.verifyJWT, authController.updateUser);
router.post("/login", authController.login, authMiddleware.createJWT);
router.post("/logout", authMiddleware.verifyJWT, authController.logout);
router.get("/isLoggedIn", authMiddleware.verifyJWT, authController.isLoggedIn);

module.exports = router;
