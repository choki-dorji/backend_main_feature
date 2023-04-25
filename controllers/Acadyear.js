const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const HttpError = require("../models/httperror");
const database = require("../models/models");
const AcadYear = database.AcadYear;

// create
exports.createdYear = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs, please check your data. ",
      422
    );
    return res.status(error.code || 500).json({ message: error.message });
  }
  const { year, description } = req.body;

  let existingyear;

  if (AcadYear.countDocuments() !== 0) {
    try {
      existingyear = await AcadYear.findOne({ year: year });
    } catch (err) {
      const error = new HttpError("Creating year Failed, Try again later", 500);
      return res.status(error.code || 500).json({ message: error.message });
    }

    if (existingyear) {
      const error = new HttpError(
        "Already created Academic yearc for the year" + year,
        422
      );
      return res.status(error.code || 500).json({ message: error.message });
    }
  }

  const createdYear = new AcadYear({
    Year: year,
    Description: description,
    Created_by: "Admin-SSO",
  });

  try {
    await createdYear.save();
    res.redirect("/");
    // res.status(201).json({ block: createdBlock.toObject({ getters: true }) });
  } catch (err) {
    // console.log(err);
    const error = new HttpError(
      "creating Academic year failed, for some unknown reason",
      500
    );
    return res.status(error.code || 500).json({ message: error.message });
  }
};

// read

// update

// delete
