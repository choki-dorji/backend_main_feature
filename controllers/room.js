const mongoose = require("mongoose");
const HttpError = require("../models/httperror");
const database = require("../models/models");
const Room = database.Room;
const Block = database.Block;

// create
exports.createRoom = async (req, res) => {
  console.log("createRoom");
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }
  const { room_name, room_capacity, isDisabled, window, status, blockid } =
    req.body;
  let existingRoom;
  try {
    existingRoom = await Room.findOne({ room_name: room_name });
  } catch (err) {
    const error = new HttpError("sth Failed, try again later", 500);
    return res.status(error.code || 500).json({ message: error.message });
  }

  if (existingRoom) {
    const error = new HttpError("room  already exists", 422);
    return res.status(error.code || 500).json({ message: error.message });
  }

  let block;
  try {
    block = await Block.findById(blockid);
    console.log(block);
  } catch (e) {
    console.log(e);
    const error = new HttpError("block with provided name is not found", 500);
    return res.status(error.code || 500).json({ message: error.message });
  }

  if (!block) {
    const error = new HttpError("could not find block for the id", 404);
    return res.status(error.code || 500).json({ message: error.message });
  }
  if (block.rooms.length === block.block_capacity) {
    const error = new HttpError("cannot create new", 422);
    return res.status(error.code || 500).json({ message: error.message });
  }
  const createdRoom = new Room({
    room_name: room_name,
    room_capacity: room_capacity,
    member: [],
    availability: room_capacity,
    blockid: blockid,
    window: window,
    isDisabled: isDisabled,
    type: block.type,
    status: status, // assign the type of block to the type of room
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdRoom.save({ session: sess });
    block.rooms.push(createdRoom);
    await block.save({ session: sess });
    await sess.commitTransaction();

    res.redirect("/add-room");
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating room failed, please try again", 500);
    return res.status(error.code || 500).json({ message: error.message });
  }
};
// read
exports.getRoom = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Room.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found Block with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Erro retrieving Block with id " + id });
      });
  } else {
    Room.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occurred while retriving user information",
        });
      });
  }
};

// update
exports.update_room = (req, res) => {
  // console.log("inside uodate");
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  // console.log(id);
  Room.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. Maybe user not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};

// delete
exports.delete = async (req, res) => {
  const id = req.params.id;

      // Find the room to be deleted
      const room = await Room.findById(id);

      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
  

  // Remove the room's ID from the corresponding block document
  const block = await Block.findById(room.blockid);
  block.rooms.pull(id);
  await block.save();

  Room.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "room was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete room with id=" + id,
      });
    });
};
