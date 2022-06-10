const express = require("express"); // import express
const Product = require('../models/product');





/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////







// Route //

//////////////////////////////////////////////
// Index Route
//////////////////////////////////////////////
router.get("/", (req, res) => {
  
  Product.find({})
    
    .then((products) => {
      res.render("index", { products });
    })
    
    .catch((error) => {
      res.json({ error });
    });
});

//////////////////////////////////////////////
// New Route
//////////////////////////////////////////////
router.get("/new", (req, res) => {
  res.render("new");
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

//////////////////////////////////////////////
// Edit Route
//////////////////////////////////////////////

router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the product from the database
  Product.findById(id)
    .then((product) => {
      // render edit page and send product data
      res.render("edit", { product });
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
 
// update the product
  Product.findByIdAndUpdate(id, req.body,{ new:true })
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






//////////////////////////////////////////////
// Show Route
//////////////////////////////////////////////
router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;

  // find the particular fruit from the database
  Product.findById(id)
    .then((product) => {
      // render the template with the data from the database
      res.render("show", { product });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});


//////////////////////////////////////////////
// Delete Route
//////////////////////////////////////////////
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


//////////////////////////////////////////////
// Buy Route
//////////////////////////////////////////////
router.put("/:id/buy", (req, res) => {
  // get the id from params
  const id = req.params.id;
  
  Product.findByIdAndUpdate(id,{$inc:{qty:-1}},{new:true})
    .then((product) => {
      // redirect to main page after deleting
      res.redirect("/products");
      console.log()
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