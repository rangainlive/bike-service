// Initialize the express.js
const express = require("express");

// JSON web token initilization
const jwt = require("jsonwebtoken");

// Initialize bcrypt
const bcrypt = require("bcryptjs");

// Import userScheme modal from models folder
const userScheme = require("../models/userModal");
const serviceSchema = require("../models/serviceModal");

// authenticate jwt Token
const authenticate = require("../Authenticate/authenticate");

// Initialize the router from express
const router = express.Router();

// Register new user in mongodb database using post request
router.post("/register", async (req, res, next) => {
  const uEmail = req.body.email;
  const uPass = req.body.password;
  const pass = await bcrypt.hash(uPass, 8);
  userScheme
    .findOne({ email: uEmail })
    .then((user) => {
      if (user) {
        res.json({
          message: "User Email Id already registered...!",
        });
      } else {
        const registeredUser = new userScheme({
          userName: req.body.userName,
          email: req.body.email,
          password: pass,
          mobile: req.body.mobile,
        });
        registeredUser
          .save()
          .then((data) => {
            res.send("User added Successfully!");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
});

// Register new user in mongodb database using post request
router.post("/login", async (req, res, next) => {
  const uEmail = req.body.email;
  const uPass = req.body.password;

  userScheme.findOne({ email: uEmail }).then((user) => {
    if (user) {
      const emailKey = user.email;
      bcrypt.compare(uPass, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          let token = jwt.sign({ email: emailKey }, "userToken", {
            expiresIn: "20m",
          });
          let refreshToken = jwt.sign({ email: emailKey }, "refreshToken", {
            expiresIn: "48h",
          });
          res.json({
            message: "Login Successful!",
            token,
            refreshToken,
            emailKey,
          });
        } else {
          res.json({
            message: "Password does not match",
          });
        }
      });
    } else {
      res.json({
        message: "No user Found !",
      });
    }
  });
});

// Post call to get the user details
router.get("/details", authenticate, (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(token, "userToken");

  // get user details from database
  userScheme.findOne({ email: decode.email }).then((user) => {
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("User details not found");
    }
  });
});

// Refresh Token api call
router.post("/refresh-token", (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  jwt.verify(refreshToken, "refreshToken", function (err, decode) {
    if (err) {
      res.status(400).json({
        err,
      });
    } else {
      console.log(decode);
      let token = jwt.sign({ email: decode.email }, "userToken", {
        expiresIn: "20m",
      });
      let refreshToken = req.body.refreshToken;
      res.status(200).json({
        message: "Token refreshed Successfully",
        token,
        refreshToken,
      });
    }
  });
});

router.post("/bookservice", async (req, res, next) => {
  const bookedService = new serviceSchema({
    email: req.body.email,
    serviceType: req.body.serviceType,
    serviceDate: req.body.serviceDate,
  });

  bookedService
    .save()
    .then((data) => {
      res.send("Service added Successfully!");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/bookedservice", authenticate, (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(token, "userToken");

  // get user details from database
  serviceSchema.find({ email: decode.email }).then((service) => {
    if (service) {
      res.status(200).send(service);
    } else {
      res.status(404).send("Service details not found");
    }
  });
});

router.get("/adminbookedservice", authenticate, (req, res, next) => {
  // get user details from database
  serviceSchema.find().then((service) => {
    if (service) {
      res.status(200).send(service);
    } else {
      res.status(404).send("Service details not found");
    }
  });
});
router.get("/userslist", authenticate, (req, res, next) => {
  // get user details from database
  userScheme.find().then((user) => {
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("Service details not found");
    }
  });
});

router.post("/updateuser", async (req, res, next) => {
  const updatedUser = new userScheme({
    ...req.body,
    location: req.body.location,
    gender: req.body.gender,
    plan: req.body.type,
  });
  console.log(updatedUser);
  userScheme
    .updateOne({ email: req.body.email }, updatedUser)
    .then((user) => {
      res.send("User updated successfully");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/updateservice", async (req, res, next) => {
  const updatedService = new serviceSchema({
    ...req.body,
    isBooked: req.body.isBooked,
    isCompleted: req.body.isCompleted,
    status: req.body.status,
  });
  console.log(updatedService);
  serviceSchema
    .updateOne({ _id: req.body._id }, updatedService)
    .then((user) => {
      res.send("Service updated successfully");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/updatevehicle", async (req, res, next) => {
  const updatedUser = new userScheme({
    ...req.body,
    vehicleModal: req.body.vehicleModal,
    vehicleNo: req.body.vehicleNo,
  });
  console.log(updatedUser);
  userScheme
    .updateOne({ email: req.body.email }, updatedUser)
    .then((user) => {
      res.send("User updated successfully");
    })
    .catch((error) => {
      console.log(error);
    });
});
router.post("/removeuser", async (req, res, next) => {
  console.log(req.body);
  userScheme
    .deleteOne({ email: req.body.email })
    .then((data) => {
      res.send("User removed successfully");
    })
    .catch((error) => {
      console.log(error);
    });
});
// Homepage path get request
router.get("/", authenticate, (req, res, next) => {
  res.send("Home page");
});

// router exported
module.exports = router;
