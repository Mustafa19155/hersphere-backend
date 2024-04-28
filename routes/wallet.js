const router = require("express").Router();

const walletController = require("../controllers/wallet");

router.get("/", walletController.getWallet);

router.post("/add-card", walletController.addCard);

router.post("/delete-card", walletController.deleteCard);

router.post("/update-balance", walletController.updateBalance);

router.post("/withdraw", walletController.withdraw);

module.exports = router;
