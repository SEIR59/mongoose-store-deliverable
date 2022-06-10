const express = require("express");
const Product = require("../models/product.js");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
router.use((req, res, next) => {
  next();
});

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// index route
router.get("/", (req, res) => {
  // find all the fruits
  Product.find({})
    // render a template after they are found
    .then((products) => {
      res.render("products/index.liquid", {
        products,
      });
    })
    // send error as json if they aren't
    .catch((error) => {
      res.json({
        error,
      });
    });
});

// create route
router.post("/", (req, res) => {
  // create the new fruit
  Product.create(req.body)
    .then((products) => {
      // redirect user to index page if successfully created item
      res.redirect("/products");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// New route
router.get("/new", (req, res) => {
  res.render("products/new.liquid");
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////

module.exports = router;
