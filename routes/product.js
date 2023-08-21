const express = require("express");
const {
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productCtrl");

const router = express.Router();

router.get("/getProduct", getProduct);
router.post("/saveProduct", saveProduct);
router.put("/updateProduct", updateProduct);
router.delete("/deleteProduct", deleteProduct);

module.exports = router;
