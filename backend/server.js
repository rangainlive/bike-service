// Initialize the Express
const express = require("express");

// import the userrouter from router folder
const userRouter = require("./routes/routes");

// Initialize dotenv
const dotenv = require("dotenv");

// configure the dotenv
dotenv.config();

// create app from express
const app = express();

//use app to call the userRouter paths
app.use("/razor", userRouter);

// listening backend server from port from environment PORT variable.
app.listen(process.env.PORT, () => console.log("Server is up and Running"));
