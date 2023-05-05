const express = require("express");
const route = express.Router();

const service = require("../service/studentRender");

// for thr ejs
// route.get("/", service.getBlocks);
route.get("/", service.StudentDashboard)

// API

exports.route = route;
