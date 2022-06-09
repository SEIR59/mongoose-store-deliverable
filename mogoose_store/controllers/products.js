///////////////////////////////////////////
// Import Dependencies
///////////////////////////////////////////
const express = require("express");
const ProductModel = require("../models/product.js");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// not sure??
router.use((req, res, next) => {
  console.log("running...");
  next();
});

/////////////////////////////////////////
// Routes
/////////////////////////////////////////
// Index Route
router.get("/", (req, res) => {
  console.log("here"); //this is logged
  ProductModel.find({})
    .then((products) => {
      console.log("does it render?"); //this is not
      res.render("products/index", { products });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
