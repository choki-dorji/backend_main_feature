const express = require("express");
const route = express.Router();

const service = require("../service/render");
const roomController = require("../controllers/room");

// for thr ejs
// route.get("/", service.getBlocks);

route.get("/add-room", service.add_room);
// route.get("/update-block", service.update_block);

// API
route.post("/api/rooms", roomController.createRoom);

exports.route = route;
