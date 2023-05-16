const express = require("express");
const route = express.Router();

const service = require("../service/render");
const roomController = require("../controllers/room");
const stud = require("../controllers/student");

route.get("/add-room", service.add_room);
route.get("/", service.getRooms);
route.get("/search", service.search_room);
route.get("/update-room", service.update_room);
route.get("/table", (req, res) => {
  res.render("Dashboard/table");
});
// route.get("/searchRoom", (req, res) => {
//   res.render("search/searchroom");
// });

// API
route.post("/api/rooms", roomController.createRoom);
route.get("/api/rooms", roomController.getRoom);
route.delete("/api/rooms/:id", roomController.delete);
route.put("/api/rooms/:id", roomController.update_room);
// route.get("/search/room", roomController.searchRoomByName);
route.get("/api/search", roomController.searchRoom);

route.get("/api/member/:id", roomController.getMembersIRoom);

route.get("/api/room/block/:id", roomController.getRoomByBlockId);

route.delete("/api/room/student/:id", stud.editstudents);

route.get("/room-details", service.search_room01);

exports.route = route;
