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

// New route
router.get("/new", (req, res) => {
  res.render("products/new.liquid");
});

// create route
router.post("/", (req, res) => {
  // create the new product into database
  ProductModel.create(req.body)
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

// edit route
router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the fruit from the database
  ProductModel.findById(id)
    .then((p) => {
      // render edit page and send fruit data
      res.render("products/edit.liquid", { p });
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//update route - from edit.liquid
router.put("/edit/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // update the product
  ProductModel.findByIdAndUpdate(id, req.body, { new: true })
    .then((p) => {
      // redirect to main page after updating
      res.redirect("/products");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

///////////////////
// buy update route
///////////////////
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // update the product
  ProductModel.findByIdAndUpdate(id, { $inc: { qty: -1 } }, { new: true })
    .then((p) => {
      // redirect to main page after updating
      res.redirect("/products");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// Delete
router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the fruit
  ProductModel.findByIdAndRemove(id)
    .then((fruit) => {
      // redirect to main page after deleting
      // still keep it
      res.redirect("/products");
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
