// create
const mongoose = require("mongoose");
const HttpError = require("../models/httperror");
const stdb = require("../models/models");
const Allocate = stdb.Allocate;
const Room = stdb.Room;
const Block = stdb.Block;

const axio = require("axios");

const allocateRoomByYearAndBlock = async (req, res, next) => {
  const { years, maleBlock, femaleBlock } = req.body;
  let blockName;
  let blockId;
  // if the block is already allocated then error
  const now = new Date();
  const currentYear = now.getFullYear();
  // Check if rooms have already been allocated for the given year and block
  //   const existingAllocation = await Allocate.findOne({
  //     year: years,
  //     block: blockId,
  //   });
  //   if (existingAllocation) {
  //     const error = new HttpError(
  //       `Rooms have already been allocated for block ${blockName} in year ${years}`,
  //       409
  //     );
  //     return res.status(error.code || 500).json({ message: error.message });
  //   }

  try {
    // Retrieve student data from API endpoint
    const response = await axio.get("http://localhost:3000/students");
    // console.log(response.data);
    let students = response.data.students.filter(
      (student) => student.year === years && student.isDisabled !== true
    );
    // console.log(students);
    // shuffel
    students = students.sort(() => Math.random() - 0.5);
    console.log(students);
    // endshuffel

    const lengthstudent = students.length;

    // console.log(students);

    console.log(`there are ${lengthstudent} students in year ${years}`);

    // Group the students by gender and specialization
    const groups = students.reduce((groups, student) => {
      const groupKey = `${student.gender}-${student.course}`;
      const existingGroup = groups.find((group) => group.key === groupKey);
      if (existingGroup) {
        existingGroup.students.push(student);
      } else {
        groups.push({
          key: groupKey,
          students: [student],
        });
      }
      return groups;
    }, []);

    let roomType;
    let block;
    let rooms;

    // add if loop to segrate disablied and not disablied
    console.log(groups.students);

    // Allocate rooms for each group
    for (const group of groups) {
      // Determine the block and room type based on the gender of the group
      // if (group.students[])
      if (group.students[0].gender === "male") {
        roomType = "boys";
        block = await Block.findById(maleBlock);
        blockName = block.block_name;
        blockId = block._id;
        rooms = block.rooms;
      } else {
        roomType = "girls";
        block = await Block.findById(femaleBlock);
        blockName = block.block_name;
        blockId = block._id;
        rooms = block.rooms;
      }

      // Print the availability of each room
      console.log(`Room availability for ${blockName}:`);
      for (const r of rooms) {
        const roomObj = await Room.findById(r);
        console.log(`${roomObj.room_name}: ${roomObj.availability}`);
      }

      // number of students can the room accon=madoate

      let totalCapacity = 0;

      try {
        // Find the block by ID
        const block = await Block.findById(blockId).populate("rooms");

        // Loop through each room in the block
        for (const room of block.rooms) {
          // Find the room by ID and populate its members (i.e., students)
          const populatedRoom = await Room.findById(room._id);

          // Add the room capacity to the total capacity
          totalCapacity += populatedRoom.room_capacity;
        }

        // Return the total capacity as a JSON response
        // res.json({ capacity: totalCapacity });
      } catch (err) {
        console.error(err);
        const error = new HttpError(
          "Something went wrong, could not find block capacity.",
          500
        );
        return res.status(error.code || 500).json({ message: error.message });
      }

      console.log(
        `there are ${totalCapacity} available in ${block.block_name}`
      );

      if (totalCapacity >= lengthstudent) {
        // Allocate each student to a room
        for (const student of group.students) {
          let room;

          // Find an available room with enough capacity for the student
          for (const r of rooms) {
            const roomObj = await Room.findById(r);
            if (
              roomObj.type === roomType &&
              roomObj.availability > 0 &&
              roomObj.members.length < roomObj.room_capacity &&
              roomObj.isDisabled === false
            ) {
              room = r;
              break;
            }
          }

          // If a room was found, allocate the student to the room
          if (room) {
            try {
              await Room.findByIdAndUpdate(room, {
                $push: { members: student._id },
                $inc: { availability: -1 },
              });
              console.log(`Allocated ${student.name} to room ${room}`);
            } catch (e) {}

            // Print the updated availability of the room
            const roomObj = await Room.findById(room);
            console.log(
              `Room ${roomObj.room_name} availability: ${roomObj.availability}`
            );

            try {
              await Allocate.create({
                student: student._id,
                room: room,
                year: years,
                block: blockId,
                created_at: currentYear,
              });
            } catch (err) {
              console.error(err);
            }
          }
          // Decrement the availability of the block
          await Block.findByIdAndUpdate(blockId, {
            $inc: {
              available: -1,
            },
          });
        }
      } else {
        const error = new HttpError(
          `Insufficient rooms to allocate all year ${years} students to this block. Select more Block!!!!`,
          500
        );
        return res.status(error.code || 500).json({ message: error.message });
      }

      // End
    }

    res.status(201).json({ message: "Rooms allocated successfully" });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(error.code || 500).json({ message: error.message });
  }
};

// getallocation
const getallocation = async (req, res, next) => {
  let allocations;
  try {
    allocations = await Allocate.find({});
  } catch (err) {
    const error = new HttpError("Fetching allocation failed", 500);
    return res.status(error.code || 500).json({ message: error.message });
  }
  res.json({
    allocation: allocations.map((block) => block.toObject({ getters: true })),
  });
};

// get all allocation by year
const report = async (req, res, next) => {
  const year = req.body.year; // assuming room name is passed as a query parameter

  let room;
  try {
    room = await Allocate.find({ year: year });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find allocation.",
      500
    );
    return res.status(error.code || 500).json({ message: error.message });
  }

  if (!room) {
    const error = new HttpError(
      "Could not find a room with the provided name.",
      404
    );
    return res.status(error.code || 500).json({ message: error.message });
  }

  res.json({ year: room });
};

// get total students
const getTotalCapacityByBlock = async (req, res, next) => {
  const blockId = req.params.bid; // assuming block ID is passed as a URL parameter

  let totalCapacity = 0;

  try {
    // Find the block by ID
    const block = await Block.findById(blockId).populate("rooms");

    // Loop through each room in the block
    for (const room of block.rooms) {
      // Find the room by ID and populate its members (i.e., students)
      const populatedRoom = await Room.findById(room._id);

      // Add the room capacity to the total capacity
      totalCapacity += populatedRoom.room_capacity;
    }

    // Return the total capacity as a JSON response
    res.json({ capacity: totalCapacity });
  } catch (err) {
    console.error(err);
    const error = new HttpError(
      "Something went wrong, could not find block capacity.",
      500
    );
    return res.status(error.code || 500).json({ message: error.message });
  }
};

exports.getTotalCapacityByBlock = getTotalCapacityByBlock;

exports.allocateRoomByYearAndBlock = allocateRoomByYearAndBlock;
exports.getallocation = getallocation;
exports.report = report;
