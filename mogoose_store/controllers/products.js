///////////////////////////////////////////
// Import Dependencies
///////////////////////////////////////////
const express = require("express");
const Product = require("../models/products");

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

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
