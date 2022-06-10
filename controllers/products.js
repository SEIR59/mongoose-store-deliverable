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
router.get("/", (req, res) => {
  Product.find({})
    .then((products) => {
      res.render('products/index', {
        products
      })
    })
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})

router.use('/:id', (req, res) => {
  const id = req.params.id
  Product.findById(id)
    .then((product) => {
      res.render('products/show', {
        product
      })
    })
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
