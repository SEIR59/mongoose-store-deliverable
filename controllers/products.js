const express = require("express");
const Product = require("../models/product.js");
const mongoose = require("mongoose");
const db = mongoose.connection;

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
    .then((product) => {
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

//update route
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  Product.findByIdAndUpdate(id, req.body, { new: true })
    .then((product) => {
      // redirect to main page after updating
      res.redirect("/products");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// delete route
router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the fruit
  Product.findByIdAndRemove(id)
    .then((product) => {
      // redirect to main page after deleting
      res.redirect("/products");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// edit route
router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the fruit from the database
  Product.findById(id)
    .then((product) => {
      // render edit page and send fruit data
      res.render("products/edit.liquid", { product });
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// buy button
router.put("/:id/buy", (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((product) => {
      product.qty = product.qty - 1;
      Product.findByIdAndUpdate(product.id, product, { new: true }).then(
        (product) => {
          res.redirect(`/products/${product.id}`);
        }
      );
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////

module.exports = router;
