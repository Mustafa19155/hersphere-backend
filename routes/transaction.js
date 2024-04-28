const router = require("express").Router();

const transactionController = require("../controllers/transaction");

router.post("/", transactionController.createTransaction);
router.get("/", transactionController.getTransactions);
router.get("/:id", transactionController.getTransaction);

module.exports = router;
