const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  userType: {
    type: String,
    required: [true, "userType is required"],
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
