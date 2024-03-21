const express = require("express");
const router = express.Router();

const promotionController = require("../controllers/promotion");

router.post("/", promotionController.createPromotion);
router.put("/:id/accept", promotionController.acceptPromotion);
router.put("/:id/reject", promotionController.rejectPromotion);
router.put("/:id/start", promotionController.startPromotion);
router.delete("/:id", promotionController.deletePromotion);
router.get("/", promotionController.getPromotionRequests);
router.get("/all", promotionController.getPromotions);
router.get("/single/:id", promotionController.getPromotion);

module.exports = router;
