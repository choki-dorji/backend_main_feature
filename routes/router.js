const express = require("express");
const route = express.Router();

const service = require("../service/render");
const blockController = require("../controllers/block");

// for thr ejs
route.get("/", service.getBlocks);

route.get("/add-block", service.add_block);
route.get("/update-block", service.update_block);

// API for Block
route.post("/api/blocks", blockController.createBlock);
route.get("/api/blocks", blockController.getBlock);
route.delete("/api/blocks/:id", blockController.delete);
route.put("/api/blocks/:id", blockController.update);

exports.route = route;
