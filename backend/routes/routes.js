// Initialize the express.js
const express = require("express");

// Initialize the router from express
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Home page");
});

// router exported
module.exports = router;
