const express = require("express");
const route = express.Router();

const service = require("../service/render");
const allocateController = require("../controllers/Allocate");
const allocatedisable = require("../controllers/allocateDisable")

// for thr ejs
// route.get("/", service.getBlocks);
route.post("/disable", allocatedisable.DisableAllocation)
route.get("/all", service.getAllocationbyId);

// API
route.post("/api/years/:year", allocateController.allocateRoomByYearAndBlock);
route.get("/api/years/:year", allocateController.getallocationbyYear);

route.get("/disable", service.disable)

route.get("/disablefemale", service.disableF)



exports.route = route;
