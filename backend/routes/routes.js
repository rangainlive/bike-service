// Initialize the express.js
const express = require("express");

// Initialize the nodemailer
const nodemailer = require("nodemailer");

// JSON web token initilization
const jwt = require("jsonwebtoken");

// Initialize bcrypt
const bcrypt = require("bcryptjs");

// Import userScheme modal from models folder
const userScheme = require("../models/userModal");
const serviceSchema = require("../models/serviceModal");
const serviceListSchema = require("../models/listServiceModal");

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

// Post api call to add the new service
router.post("/addservice", async (req, res, next) => {
  const registeredService = new serviceListSchema({
    serviceName: req.body.serviceName,
  });
  registeredService
    .save()
    .then((data) => {
      res.status(200).send("New Service added Successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get api call to get the  service list
router.get("/servicelist", authenticate, (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(token, "userToken");

  // get user details from database
  serviceListSchema.find().then((service) => {
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).send("Service details not found");
    }
  });
});

// Post api call to fix and appointment for Bike Service
router.post("/bookservice", async (req, res, next) => {
  const bookedService = new serviceSchema({
    email: req.body.email,
    serviceType: req.body.serviceType,
    serviceDate: req.body.serviceDate,
  });

  // Step 1
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  bookedService
    .save()
    .then((data) => {
      res.send("Service added Successfully!");

      // Step 2
      let mailOptions = {
        from: "ranga15cse@gmail.com",
        to: "rangainlive@gmail.com",
        subject: "Booking Request",
        text: "Bike Service Request added",
      };

      // Step 3
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log("Error Occur", err);
        } else {
          console.log("Email Sent !!!");
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

// Get api call to get the booked appoinments
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

// Get api call to get and list the booked appoinments
router.get("/adminbookedservice", authenticate, (req, res, next) => {
  // get user details from database
  serviceSchema.find().then((service) => {
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).send("Service details not found");
    }
  });
});

// Get api call to get the registered users
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

// POST api call to update the user informations
router.post("/updateuser", async (req, res, next) => {
  const updatedUser = new userScheme({
    ...req.body,
    location: req.body.location,
    gender: req.body.gender,
    plan: req.body.type,
  });
  // console.log(updatedUser);
  userScheme
    .updateOne({ email: req.body.email }, updatedUser)
    .then((user) => {
      res.send("User updated successfully");
    })
    .catch((error) => {
      console.log(error);
    });
});

// POST api call to update the booked service
router.post("/updateservice", async (req, res, next) => {
  const updatedService = new serviceSchema({
    ...req.body,
    isBooked: req.body.isBooked,
    isCompleted: req.body.isCompleted,
    status: req.body.status,
  });

  // Step 1
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  serviceSchema
    .updateOne({ _id: req.body._id }, updatedService)
    .then((user) => {
      res.send("Service updated successfully");
      // Step 2
      let mailOptions = {
        from: "ranga15cse@gmail.com",
        to: "rangainlive@gmail.com",
        subject: "Service Status Updated",
        text: "Your bike service request updated. Kindly check with your Login",
      };

      // Step 3
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log("Error Occur", err);
        } else {
          console.log("Email Sent !!!");
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

// POST api call to update the vehicle details
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

// POST api call to remove user
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


// router exported
module.exports = router;
