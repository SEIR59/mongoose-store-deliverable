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
  ProductModel.find({})
    .then((products) => {
      res.render("products/index", { products });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// show route
// not array id anymore, id is from mongodb
router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;

  // find the particular product from the database
  ProductModel.findById(id)
    .then((p) => {
      // render the template with the data from the database
      res.render("products/show.liquid", { p });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
