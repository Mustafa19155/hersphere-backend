const express = require("express");
const paymentRouter = express.Router();
const paymentController = require("../controllers/payment");

paymentRouter.post("/create", paymentController.createPayment);
paymentRouter.post("/update/:id", paymentController.updatePayment);

module.exports = paymentRouter;
