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

// show route
router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // find the particular fruit from the database
  Product.findById(id)
    .then((products) => {
      // render the template with the data from the database
      res.render("products/show.liquid", { products });
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
