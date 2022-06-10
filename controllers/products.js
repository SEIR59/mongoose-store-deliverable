/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const express = require("express");
const Product = require('../models/product.js')

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////
  
  // index route
//   async: dont run, i have to wait for find finish, before i run
//   router.get("/", async (req, res) => {
//       console.log('huh')
//       const products = await Product.find({});
//     res.render("products/index.liquid", {
//       products
//     });
//   });

//this worked
// router.get('/', (req, res) => {
//     res.send('say something')
// })


router.get('/', (req, res) => {
    Product.find({})
    .then((products) => {
        // res.send(products)
        res.render('./products/index.liquid', {products})

    })
    .catch((error) => {
      console.log(error)
      res.json({error})
    })
})


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router