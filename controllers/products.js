const express = require('express')
const Product = require('../models/product.js')
const router = express.Router()

/////////////////////////////////////////
// Routes
/////////////////////////////////////////



// Index route
router.get('/', (req, res) => {
    Product.find({})
    // render a template after they are found
    .then((searchResult) => {
      console.log(searchResult)
    //   res.send('index page')
      res.render("./products/index.liquid", { searchResult });
    })
    // send error as json if they aren't
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
})

// create route
router.post("/", (req, res) => {
    // create the new product
    Product.create(req.body)
        .then((searchResult) => {
            // redirect user to index page if successfully created item
            res.redirect("/products");
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});


// New route // Edit button route
router.get('/new', (req, res) => {
    res.render('products/new.liquid')
})

// show route
router.get("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // find the particular product from the database
    Product.findById(id)
        .then((searchResult) => {
            // render the template with the data from the database
            res.render("products/show.liquid", { searchResult });
        })
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});

// //update route
router.put("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // update the product, new:true actually returns the updated item
    Product.findByIdAndUpdate(id, req.body, { new: true })
      .then((searchResult) => {
        // redirect to main page after updating
        res.redirect("/products");
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
    // delete the product
    Product.findByIdAndRemove(id)
      .then((searchResult) => {
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
    // get the products from the database
    Product.findById(id)
      .then((searchResult) => {
        // render edit page and send product data
        res.render("products/edit.liquid", { searchResult });
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
module.exports = router



