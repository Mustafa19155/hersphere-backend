const router = require("express").Router();
const {
  getReports,
  getReport,
  createReport,
  updateReport,
  deleteReport,
} = require("../controllers/reports");
const { verifyJWT } = require("../middlewares/verifyJwt");

router.get("/", getReports);
router.get("/:id", getReport);
router.post("/", verifyJWT, createReport);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);

module.exports = router;
