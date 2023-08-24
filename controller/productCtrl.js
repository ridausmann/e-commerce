const productModel = require("../models/productModel");

const getProduct = async (req, res) => {
  const product = await productModel.find();
  return res.send(product);
};
const saveProduct = async (req, res) => {
  let product = new productModel();
  product.name = req.body.name;
  product.price = req.body.price;
  product.category = req.body.category;
  product.quantity = req.body.quantity;
  product.userId = req.body.userId;
  // product.createdBy = req.user._id;
  await product.save();
  return res.send(product);
};
const updateProduct = async (req, res) => {
  let product = await productModel.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  product.category = req.body.category;
  product.quantity = req.body.quantity;
  await product.save();
  return res.send(product);
};
const deleteProduct = async (req, res) => {
  let product = await productModel.findByIdAndDelete(req.params.id);
  return res.send(product);
};
module.exports = {
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
};
