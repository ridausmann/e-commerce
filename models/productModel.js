const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  price: {
    type: String,
    required: [true, "price is required"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
  },
  quantity: {
    type: String,
    required: [true, "quantity is required"],
  },
  // createdBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "users",
  // },
});

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
