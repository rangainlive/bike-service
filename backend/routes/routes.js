// Initialize the express.js
const express = require("express");

// JSON web token initilization
const jwt = require("jsonwebtoken");

// Initialize bcrypt
const bcrypt = require("bcryptjs");

// Import userScheme modal from models folder
const userScheme = require("../models/userModal");

// authenticate jwt Token
const authenticate = require("../Authenticate/authenticate");

// Initialize the router from express
const router = express.Router();

// Register new user in mongodb database using post request
router.post("/register", async (req, res, next) => {
    const uEmail = req.body.email;
    const uPass = req.body.password;
    const pass = await bcrypt.hash(uPass, 8);
    userScheme.findOne({email:uEmail}).then((user) => {
        if(user) {
            res.json({
                message: "User Email Id already registered...!"
            })
        }else {
            
            const registeredUser = new userScheme({
            userName: req.body.userName,
            email: req.body.email,
            password: pass,
            mobile: req.body.mobile,
          });
          registeredUser
            .save()
            .then((data) => {
              res.json(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
    }).catch((error) => {
        res.json({
            message: error
        })
    })

    
});

// Register new user in mongodb database using post request
router.post("/login", async (req, res, next) => {
  const uEmail = req.body.email;
  const uPass = req.body.password;

  userScheme.findOne({email: uEmail}).then((user) => {
      if(user) {
          bcrypt.compare(uPass, user.password, function(err, result){
              if(err){
                  res.json({
                      error: err,
                  })
              }
              if(result){
                let token = jwt.sign({email: user.email}, 'userToken', {expiresIn: '20s'});
                let refreshToken = jwt.sign({email: user.email}, 'refreshToken', {expiresIn: '48h'});
                res.json({
                    message: "Login Successful!",
                    token,
                    refreshToken
                })
              }else {
                  res.json({
                      message: "Password does not match",
                  })
              }
          })
      }else {
          res.json({
              message: "No user Found !"
          })
      }
  })
  
});

// Refresh Token api call
router.post("/refresh-token", (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    jwt.verify(refreshToken, "refreshToken", function(err, decode) {
        if(err) {
            res.status(400).json({
                err
            })
        }else {
            console.log(decode);
            let token = jwt.sign({email: decode.email}, "userToken", {expiresIn: "20s"})
            let refreshToken = req.body.refreshToken;
            res.status(200).json({
                message: "Token refreshed Successfully",
                token,
                refreshToken
            })
        }
    })
})

// Homepage path get request
router.get("/", authenticate, (req, res, next) => {
  res.send("Home page");
});

// router exported
module.exports = router;