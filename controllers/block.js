// importing
const { validationResult } = require("express-validator");

const HttpError = require("../models/httperror");
const database = require("../models/models");
const Block = database.Block;

// create
const createBlock = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs, please check your data. ",
      422
    );
    return res.status(error.code || 500).json({ message: error.message });
  }
  const { block_name, no_of_rooms, type, status } = req.body;

  let existingBlock;

  if (Block.countDocuments() !== 0) {
    try {
      existingBlock = await Block.findOne({ block_name: block_name });
    } catch (err) {
      const error = new HttpError(
        "Creating Block Failed, Try again later",
        500
      );
      return res.status(error.code || 500).json({ message: error.message });
    }

    if (existingBlock) {
      const error = new HttpError(
        "Block with the provided name already exist",
        422
      );
      return res.status(error.code || 500).json({ message: error.message });
    }
  }

  const createdBlock = new Block({
    block_name: block_name,
    no_of_rooms: no_of_rooms,
    rooms: [],
    type: type,
    available: no_of_rooms,
    status: status,
  });

  try {
    await createdBlock.save();
    res.redirect("/add-block");
    // res.status(201).json({ block: createdBlock.toObject({ getters: true }) });
  } catch (err) {
    // console.log(err);
    const error = new HttpError("creating Block failed, please try again", 500);
    return res.status(error.code || 500).json({ message: error.message });
  }
};

// read
exports.getBlock = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Block.findById(id)
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
    Block.find()
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

// delete
exports.delete = (req, res) => {
  const id = req.params.id;

  Block.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "Block was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Block with id=" + id,
      });
    });
};

// get block by particulat id

// update
exports.update = (req, res) => {
  console.log("inside uodate");
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  // console.log(id);
  Block.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

exports.createBlock = createBlock;
// exports.getBlock = getBlock;
