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
      res.render("index", { blocks: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.update_block = (req, res) => {
  axios
    .get("http://localhost:5000/api/blocks", { params: { id: req.query.id } })
    .then(function (blockdata) {
      res.render("update_block", { block: blockdata.data });
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
