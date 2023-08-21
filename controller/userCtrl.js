const userModel = require("../models/userModel");
const { setUser } = require("../service/auth");
const { v4: uuidv4 } = require("uuid");

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
  const { name, email, password, userType } = req.body;
  await userModel.create({
    name,
    email,
    password,
    userType,
  });
  return res.status(201).json("User Created Successfully");
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, password });
  if (!user) return res.status(400).json("Invalid User or Pass");
  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.status(201).json("Logged In");
};

module.exports = {
  getUser,
  // saveUser,
  updateUser,
  deleteUser,
  handleUserSignUp,
  handleUserLogin,
};
