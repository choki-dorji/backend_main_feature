const express = require("express");
const route = express.Router();

const service = require("../service/render");
const yearController = require("../controllers/Acadyear");

// for thr ejs
// route.get("/", service.getBlocks);

route.get("/add-year", service.add_year);

// API
route.post("/api/years", yearController.createdYear);

exports.route = route;
