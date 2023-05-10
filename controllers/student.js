const axio = require("axios");
const multer = require("multer");
const stud = require("../models/models");
const Allocate = stud.Allocation;
const Block = stud.Block;
const rooms = stud.Room;
const Request = stud.Request;
const removedStudents = stud.removedStudents;

// get roomm mate
exports.getRoommates = async (req, res) => {
  const currentYear = new Date().getFullYear();
  try {
    const userId = req.params.uid;
    const allocation = await Allocate.findOne({
      sid: userId,
      academicyear: currentYear,
    }).populate("roomid");
    if (!allocation) {
      return res.status(404).json({ message: "Allocation not found" });
    }
    const roomId = allocation.roomid;
    const roommates = await Allocate.find({
      roomid: roomId,
      academicyear: currentYear,
    }).populate("student");
    const mateNames = roommates
      .filter((mate) => mate.sid !== userId)
      .map((mate) => mate);
    // res.json({ mates: mateNames });
    // console.log(mateNames);
    res.send(mateNames);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// request Hostelchange/////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
exports.hostelChangeRequest = async (req, res) => {
  const { targetBlock, targetRoom, reason} = req.body;
  const studentId = req.params.uid;
  const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });



  // Assuming the logged-in student's ID is stored in the `id` property of the `req.user` object
 

  try {
    upload.single("filename")(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "File upload failed" });
      }

      let block;
      // Check if the specified block exists
      console.log(targetBlock, targetRoom);
      block = await Block.findOne({ _id: targetBlock });
      if (!block) {
        return res.status(404).json({ message: "Block not found" });
      }

      const fileName = req.file.filename
      console.log(fileName)


      // Check if the specified room exists in the specified block
      const room = await rooms.findOne({
        _id: targetRoom,
        blockid: block._id,
      });
      if (!room) {
        return res
          .status(404)
          .json({ message: "Room not found in specified block" });
      }
      console.log("rtyuiop");

      // Check if the logged-in student's current room is in the specified block
      const currentRoom = await Allocate.findOne({ sid: studentId });
      const student_name = currentRoom.student_name;
      const student_email = currentRoom.student_email;
      const student_course = currentRoom.course;
      const student_year = currentRoom.year;
      const student_gender = currentRoom.student_gender;

      console.log(
        student_email,
        student_course,
        student_year,
        student_gender,
        student_name
      );

      const currentBlock = await Block.findOne({ _id: currentRoom.blockid });
      const currentRooms = await rooms.findOne({ _id: currentRoom.roomid });
      if (!currentBlock && !currentRoom) {
        return res.status(404).json({
          message: "Current block and room not found for logged-in student",
        });
      }
      console.log("sdfghjkl");
      // Check if the requested room is available
      if (room.availability === 0) {
        return res
          .status(400)
          .json({ message: "Requested room is not available" });
      }
      console.log("fguiohgfhjk");
      console.log(" curret block", currentBlock);
      console.log(" curret room", currentRooms);

      // if (room.availability === room.room_capacity) {
      console.log("in if loop checking already available");
      // Check if the logged-in student has already made a request to change rooms
      const existingRequest = await Request.findOne({ student: studentId });
      if (existingRequest) {
        console.log("already have");
        return res.status(500).json({
          message: "You already have a pending request to change rooms",
        });
      }
      console.log("ftyghytyguuu");
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const curdate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      // Create a new request object

      const request = new Request({
        student: studentId,
        room: currentRooms._id,
        block: currentBlock._id,
        targetblock: block._id,
        targetroom: room._id,
        Requested: curdate,
        status: "pending",
        Remarks: "requested",
        image: fileName,
        reason: reason,
        student_name: student_name,
        student_email: student_email,
        student_course: student_course,
        student_gender: student_gender,
        student_year: student_year,
        clicked: false,
      });

      // Save the request to the database
      await request.save();

      // Return a success message
      return res.json({ message: "Request submitted successfully" });
      // } else {
      // return res.json({ message: "Requested Room is not empty" });
      // }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// //////////////
exports.editstudents = async (req, res) => {
  const studentId = req.params.id;
  const remarks = req.body.remarks;

  try {
    const updatedStudent = await Allocate.findOneAndUpdate(
      { sid: studentId },
      { allocated: "No", remarks: remarks },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).send({
        message: `Cannot update allocation and remarks for student with sid ${studentId}. Maybe sid is wrong`,
      });
    }

    res.send({
      message: "Student allocation and remarks were updated successfully!",
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({
        message:
          "Could not update student allocation and remarks with sid=" +
          studentId,
      });
  }
};
