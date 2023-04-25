const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const blockRoute = require("./routes/router");
const HttpError = require("./models/httperror");
const RoomRoutes = require("./routes/roomRoutes");
const yearRoute = require("./routes/year");
const allocate = require("./routes/allocate");
const chart = require("./routes/chart");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", blockRoute.route);

app.use("/room", RoomRoutes.route);

app.use("/year", yearRoute.route);

app.use("/Allocate", allocate.route);

app.use("/chart", chart);

app.set("view engine", "ejs");

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// app.use((req, res, next) => {
//   const error = new HttpError("could not find this route", 404);
//   throw error;
// });

app.use((error, req, res, next) => {
  if (!res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An error occurred! " });
});

mongoose
  .connect(
    "mongodb+srv://Choki:Bumthap123@cluster0.7i7nwco.mongodb.net/HostelAllocation?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
    console.log("connect to database");
  })
  .catch((error) => {
    console.log(error);
  });
