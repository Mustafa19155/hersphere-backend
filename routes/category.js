const router = require("express").Router();

const categoryController = require("../controllers/category");

router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategory);

module.exports = router;
