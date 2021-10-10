// Initialize the Express
const express = require("express");


// Initialize cors
const cors = require("cors");

// Initialize Mongoose
const mongoose = require("mongoose");

// import the userrouter from router folder
const userRouter = require("./routes/routes");

// Initialize dotenv
const dotenv = require("dotenv");

// configure the dotenv
dotenv.config();

// create app from express
const app = express();

 // Connect Mongodb with express.js
 mongoose.connect(process.env.DATABASE_USERS, () =>
 console.log("Database Connected")
);

// call body parser using express
app.use(express.json());

// use cors to accept request from Cross Orgin
app.use(cors());

//use app to call the userRouter paths
app.use("/app", userRouter);

// listening backend server from port from environment PORT variable.
app.listen(process.env.PORT, () => console.log("Server is up and Running"));