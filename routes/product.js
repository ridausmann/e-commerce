const express = require("express");
const {
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productCtrl");
const { checkAuth } = require("../middlewares/auth");

const router = express.Router();

router.get("/getProduct", getProduct);
router.post("/saveProduct", saveProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
