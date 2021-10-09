// Initialize the express.js
const express = require("express");

// Import userScheme modal from models folder
const userScheme = require("../models/userModal");

// Initialize the router from express
const router = express.Router();

// Register new user in mongodb database using post request
router.post("/register", (req, res, next) => {
    const registeredUser = new userScheme({
        userName : req.body.userName,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
    });
    registeredUser.save().then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
}) 

// Homepage path get request
router.get("/", (req, res, next) => {
  res.send("Home page");
});

// router exported
module.exports = router;
