// Initialize Mongodb
const mongoose = require("mongoose");

// create a userSchema template from mongoose Scheme
const serviceListSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
});

// export the userScheme module
module.exports = mongoose.model("serviceList", serviceListSchema);
