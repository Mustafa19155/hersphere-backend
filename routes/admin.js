const userController = require("../controllers/admin/user");
const mainController = require("../controllers/admin/main");
const adminController = require("../controllers/admin");

const router = require("express").Router();

// auth
router.post("/login", adminController.login);
router.post("/logout", adminController.logout);
router.get("/check-login", adminController.checkLogin);

// users
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUser);
router.put("/users/:id/block", userController.blockUser);
router.put("/users/:id/unblock", userController.unblockUser);
router.get(
  "/users/all/success-score",
  userController.getUsersWithHighestSuccessScore
);

// promotions
router.get("/promotions", mainController.getAllPromotions);
router.get("/promotions/:id", mainController.getPromotion);

// jobs
router.get("/jobs", mainController.getAllJobs);
router.get("/jobs/:id", mainController.getJob);

// dashboard
router.get("/dashboard", mainController.getDashboardData);

// categories
router.get("/category", mainController.getCategories);
router.get("/category/:id", mainController.getCategory);
router.post("/category", mainController.createCategory);
router.put("/category/:id", mainController.updateCategory);
router.delete("/category/:id", mainController.deleteCategory);

// reports
router.get("/report", mainController.getReports);
router.get("/report/:id", mainController.getReport);
router.put("/report/:id", mainController.updateReport);
router.delete("/report/:id", mainController.deleteReport);

module.exports = router;
