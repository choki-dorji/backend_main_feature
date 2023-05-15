const express = require("express");
const route = express.Router();

const student = require("../controllers/student");
const service = require("../service/studentRender");

// for thr ejs
// route.get("/", service.getBlocks);
route.get("/", service.StudentDashboard);

route.get("/get-roommate/:uid", student.getRoommates);

route.post("/changeroom/:uid", student.hostelChangeRequest);

route.get("/search", student.searchStudentsBySID);

route.get("/count/:years", student.countStudentsByYear);

route.post("/delete/:students", student.createRemovedStudent);

// API

exports.route = route;
