const express = require("express");
const route = express.Router();

const requestget = require("../controllers/requestController");

route.get("/", requestget.getAllhostelChangeRequest);


exports.route = route;
