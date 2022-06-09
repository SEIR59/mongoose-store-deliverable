//////////////////////////////////////
// Import Dependencies
//////////////////////////////////////
const express = require("express");
const Product = require('../models/products.js')
/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();



//Index Route
router.get("/", async (req, res) => {
    const products =  Product.find({});
    res.render("index.liquid", { products });
  });
  
  //New Route
  router.get("/new", (req, res) => {
    res.render("new.liquid");
  });
  
  // create route
  router.post("/", (req, res) => {
    // check if the readyToEat property should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
    // create the new fruit
    PR.create(req.body)
      .then((stores) => {
        // redirect user to index page if successfully created item
        res.redirect("/store");
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
      .then((stores) => {
        // render edit page and send fruit data
        res.render("edit.liquid", { products });
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });
  
  router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // delete the fruit
    Store.findByIdAndRemove(id)
      .then((product) => {
        // redirect to main page after deleting
        res.redirect("/store");
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
    // check if the readyToEat property should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
    // update the fruit
    Product.findByIdAndUpdate(id, req.body, { new: true })
      .then((store) => {
        // redirect to main page after updating
        res.redirect("/store");
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });
  
  // show route
  router.get("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
  
    // find the particular fruit from the database
    Product.findById(id)
      .then((stores) => {
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
  