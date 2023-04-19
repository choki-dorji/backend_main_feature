const { validationResult } = require("express-validator");

const HttpError = require("../models/httperror");
const database = require("../models/models");
const Room = database.Room;
const Block = database.Block;

// create
exports.createRoom = async (req, res) => {
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
    const error = new HttpError("room  already exists, please Login", 422);
    return res.status(error.code || 500).json({ message: error.message });
  }

  let block;
  try {
    block = await Block.findById(blockid);
    console.log(block);
  } catch (e) {
    console.log(e);
    const error = new HttpError("Creating place failed, platry again", 500);
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
    const error = new HttpError("Creating place failed, please try again", 500);
    return res.status(error.code || 500).json({ message: error.message });
  }
};
// read

// update

// delete
