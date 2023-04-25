const express = require("express");
const route = express.Router();

const service = require("../service/render");
const allocateController = require("../controllers/Allocate");

// for thr ejs
// route.get("/", service.getBlocks);

route.get("/add-allocation", service.add_Allocation);

// API
route.post("/api/years", allocateController.allocateRoomByYearAndBlock);

exports.route = route;
