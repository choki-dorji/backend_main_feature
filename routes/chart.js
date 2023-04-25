const express = require("express");
const { check } = require("express-validator");
const chartjs = require("../controllers/chart");
const service = require("../service/render");

const router = express.Router();

// router.get('/', blockController.getBlock)

router.get("/chart", service.getchart);

router.get("/", chartjs.ChartJS);
// router.put("/:id", requestController.UpdateRequest);

module.exports = router;
