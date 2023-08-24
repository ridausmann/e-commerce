const userModel = require("../models/userModel");
const { setUser } = require("../service/auth");
const { v4: uuidv4 } = require("uuid");
const bycrypt = require("bcryptjs");
const productModel = require("../models/productModel");

const getUser = async (req, res) => {
  const user = await userModel.find();
  return res.send(user);
};
// const saveUser = async (req, res) => {
//   let user = new userModel();
//   user.name = req.body.name;
//   user.email = req.body.email;
//   user.password = req.body.password;
//   user.userType = req.body.userType;
//   await user.save();
//   return res.send(user);
// };
const updateUser = async (req, res) => {
  let user = await userModel.findById(req.params.id);
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.userType = req.body.userType;
  await user.save();
  return res.send(user);
};
const deleteUser = async (req, res) => {
  let user = await userModel.findByIdAndDelete(req.params.id);
  return res.send(user);
};

const handleUserSignUp = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "user already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res
      .status(201)
      .send({ message: "Registeration Successful", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

const handleUserLogin = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bycrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }
    // const sessionId = uuidv4();
    // setUser(sessionId, user);
    // res.cookie("uid", sessionId);
    res
      .status(200)
      .send({ message: "Login Success", success: true, user: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

module.exports = {
  getUser,
  // saveUser,
  updateUser,
  deleteUser,
  handleUserSignUp,
  handleUserLogin,
};
