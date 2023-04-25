const express = require("express");
const route = express.Router();

const service = require("../service/render");
const roomController = require("../controllers/room");

// for thr ejs
// route.get("/", service.getBlocks);

route.get("/add-room", service.add_room);
route.get("/", service.getRooms);
route.get("/update-room", service.update_room);

// API
route.post("/api/rooms", roomController.createRoom);
route.get("/api/rooms", roomController.getRoom);
route.delete("/api/rooms/:id", roomController.delete);
route.put("/api/rooms/:id", roomController.update_room);

exports.route = route;
