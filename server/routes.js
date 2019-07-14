const express = require("express");

let homeController = require("./controllers/homeController");

module.exports = express
  .Router()
  .get("/", homeController.mainHome)

