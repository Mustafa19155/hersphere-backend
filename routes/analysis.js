const analysisRouter = require("express").Router();

const analysisController = require("../controllers/analysis");

analysisRouter.get("/influencer", analysisController.influencerAnalysis);
analysisRouter.get("/startup", analysisController.startupAnalysis);
analysisRouter.get("/skills", analysisController.skillRecommendation);

module.exports = analysisRouter;