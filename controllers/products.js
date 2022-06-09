////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Product = require("../models/product");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////
router.use("/", (req, res) => {
  res.render('products/index')
})


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
