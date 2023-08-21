const express = require("express");
const {
  getUser,
  // saveUser,
  updateUser,
  deleteUser,
  handleUserSignUp,
  handleUserLogin,
} = require("../controller/userCtrl");
const router = express.Router();

router.get("/getUser", getUser);
// router.post("/saveUser", saveUser);
router.put("/updateUser", updateUser);
router.delete("/deleteUser", deleteUser);

router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);

module.exports = router;
