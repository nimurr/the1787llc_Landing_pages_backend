const express = require("express");
const { analysisHistoryController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const router = express.Router();

router.post("/", auth("user"), analysisHistoryController.createHistory);


module.exports = router;