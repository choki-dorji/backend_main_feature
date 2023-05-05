const HttpError = require("../models/httperror");
const stdb = require("../models/models");
const Room = stdb.Room;
const Request = stdb.Request;

// get request

// get request by date
exports.getAllhostelChangeRequest = async (req, res) => {
  try {
    const viewMore = req.query.viewMore === "true"; // Check if view more button was clicked

    let requests;
    if (viewMore) {
      requests = await Request.find({}).sort({ Requested: -1 });
    } else {
      requests = await Request.find({}).sort({ Requested: -1 }).limit(10);
    }

    // res.send(requests);
    res.render("Request/index", { requests: requests });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
// update request
exports.UpdateRequest = async (req, res) => {
  const requestId = req.params.id;
  const { remarks, status } = req.body;
  // date and timeout
  const now = new Date();
  const currentDateTime = now.toLocaleString();

  let request;
  try {
    request = await Request.findOne({ _id: requestId });
  } catch (err) {
    console.error(err);
    const error = new HttpError(
      "Something went wrong, could not update request1",
      500
    );
    return res.status(error.code || 500).json({ message: error.message });
  }

  if (!request) {
    const error = new HttpError(
      "Could not find a request for the provided ID",
      404
    );
    return res.status(error.code || 500).json({ message: error.message });
  }

  if (status === "accepted") {
    const currentRoom = request.room;
    const newRoom = request.targetroom;
    // Update allocation table
    try {
      const allocation = await Allocate.findOneAndUpdate(
        { room: newRoom, year: request.year },
        { $set: { room: newRoom, created_at: Date.now() } },
        { new: true }
      );
      console.log(`Allocation updated: ${allocation}`);
    } catch (err) {
      console.error(err);
      const error = new HttpError(
        "Something went wrong, could not update allocation",
        500
      );
      return res.status(error.code || 500).json({ message: error.message });
    }

    // Update request table
    request.Remarks = remarks || request.Remarks;
    request.status = "Accepted";

    // in recent table
    const recent = new RecentActivity({
      student: request.student,
      Description: "Accepted",
      date: currentDateTime,
    });
    try {
      await request.save();
      await recent.save();
      console.log(`Request updated: ${request}`);
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        "Something went wrong, could not update request",
        500
      );
      return res.status(error.code || 500).json({ message: error.message });
    }

    // Update room table
    try {
      const room = await Room.findByIdAndUpdate(
        newRoom,
        { $inc: { availability: -1 } },
        { new: true }
      );
      // console.log(
      //   `Availability updated for room ${room.room_name}: ${room.availability}`
      // );
    } catch (err) {
      console.error(err);
      const error = new HttpError(
        "Something went wrong, could not update availability",
        500
      );
      return res.status(error.code || 500).json({ message: error.message });
    }
  } else if (status === "rejected") {
    // Update request table
    request.Remarks = remarks || request.Remarks;
    request.status = "Rejected";
    //reject
    const recent = new RecentActivity({
      student: request.student,
      Description: "Rejected",
      date: currentDateTime,
    });
    try {
      await request.save();
      await recent.save();
      console.log(`Request updated: ${request}`);
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        "Something went wrong, could not update request",
        500
      );
      return res.status(error.code || 500).json({ message: error.message });
    }
  } else {
    const error = new HttpError("Invalid status value", 400);
    return res.status(error.code || 500).json({ message: error.message });
  }

  // res.json({ message: "Request updated successfully" });
  res.send("Request Granted Successfully");
};
