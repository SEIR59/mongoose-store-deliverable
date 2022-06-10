//////////////////////////////////////
// Import Dependencies
//////////////////////////////////////
const express = require("express");
const Product = require("../models/products.js");
/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

//Index Route
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.render("index.liquid", { products });
});

//New Route
router.get("/new", (req, res) => {
  res.render("new.liquid");
});

// create route
router.post("/", (req, res) => {
  // create the new fruit
  Product.create(req.body)
    .then((product) => {
      // redirect user to index page if successfully created item
      res.redirect("/store");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// EDIT ROUTE
router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the fruit from the database
  Product.findById(id)
    .then((products) => {
      // render edit page and send fruit data
      res.render("edit.liquid", { products });
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//update route
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // update the products
  Product.findByIdAndUpdate(id, req.body, { new: true })
    .then((products) => {
      // redirect to main page after updating
      res.redirect("/store");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
///DELETE
router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the fruit
  Product.findByIdAndRemove(id)
    .then((products) => {
      // redirect to main page after deleting
      res.redirect("/store");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
//BUY
router.put("/:id/buy", (req, res) => {
  //get the id from params
  const id = req.params.id;
  Product.updateOne({ _id: id }, { $inc: { qty: -1 } })
    .then((products) => {
      // redirect to main page after updating
      res.redirect(`/store/${id}`);
    })
    // send error as json
    .catch((error) => {
        console.log(error)
        res.json({ error })
    });
});

// show route
router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  console.log(req.body);
  // find the particular fruit from the database
  Product.findById(id)
    .then((products) => {
      // render the template with the data from the database
      res.render("show.liquid", { products });
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
