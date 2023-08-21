const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { restrictToLoggedUserOnly, checkAuth } = require("./middlewares/auth");

const userRouter = require("./routes/user");
const productRouter = require("./routes/product");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/product", restrictToLoggedUserOnly, checkAuth, productRouter);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

mongoose
  .connect("mongodb://localhost:27017/Ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
