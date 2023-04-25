const axios = require("axios");

exports.add_block = (req, res) => {
  res.render("add_block");
};

exports.getBlocks = (req, res) => {
  // Make a get request to /api/users
  axios
    .get("http://localhost:5000/api/blocks")
    .then(function (response) {
      // console.log(response);
      // res.render("blockd/index", { blocks: response.data });
      res.render("getblock", { blocks: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.update_block = (req, res) => {
  axios
    .get("http://localhost:5000/api/blocks", { params: { id: req.query.id } })
    .then(function (blockdata) {
      res.render("blockd/index", { block: blockdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// //////////////////////////////////////////////////
//////////////////////////////////////////////////////
/////////////////Rooms /////////////////////////
exports.add_room = (req, res) => {
  res.render("add_room");
};

// get rooms
exports.getRooms = (req, res) => {
  // Make a get request to /api/users
  axios
    .get("http://localhost:5000/room/api/rooms")
    .then(function (response) {
      // console.log(response);
      res.render("getroom", { room: response.data });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

// uodate
exports.update_room = (req, res) => {
  axios
    .get("http://localhost:5000/room/api/rooms", {
      params: { id: req.query.id },
    })
    .then(function (blockdata) {
      res.render("update_room", { room: blockdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// /////////////////////////////////////////////
/////////////////////////////////////////////////
///////////YEAR//////////////////////////////////
exports.add_year = (req, res) => {
  res.render("add_year");
};

// Allocattion
exports.add_Allocation = (req, res) => {
  res.render("add_Allocation");
};

////////////////////////////////
/////////// chart ...///////////
exports.getchart = (req, res) => {
  // Make a get request to /api/users
  axios
    .get("http://localhost:5000/chart")
    .then(function (response) {
      console.log(response.data);
      res.render("chart", { chart: response.data });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};
