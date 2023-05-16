const axios = require("axios");
const request = require("../models/models");
const Request = request.Request;

exports.StudentDashboard = (req, res) => {
  // calling student to get their detail
  const userdata = req.cookies.userData;
  const user = JSON.parse(userdata);
  const currentYear = new Date().getFullYear();
  console.log(user);

  axios
    .all([
      axios.get("http://localhost:5000/api/blocks"),
      axios.get(`http://localhost:5000/students/get-roommate/${user.sid}`),
      axios.get("http://localhost:5000/room/api/rooms"),
      axios.get(`http://localhost:5000/allocate/api/years/${currentYear}`),
    ])
    .then(
      axios.spread(function (blocksResponse, roomsResponse, room, allocate) {
        res.render("students/index", {
          userdata: user,
          block: blocksResponse.data,
          roommate: roomsResponse.data,
          room: room.data,
          allocate: allocate.data,
        });
      })
    )
    .catch((err) => {
      console.log(err);
      res.send(err);
    });

  // calling to get Roommate
};


exports.search_student = async (req, res) => {
  const notificationCount = await Request.countDocuments({ clicked: false });
  res.render("students/student-details", { notificationCount: notificationCount });
};