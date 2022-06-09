/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const express = require('express')
const Product = require('../models/product.js')

////////////////////////////////////////////
// Create Route
////////////////////////////////////////////
const router = express.Router();

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
console.log("sent to store-controller")
//Seed
router.get('/seed', async (req, res) => {
    const newProducts =
      [
        {
          name: 'Beans',
          description: 'A small pile of beans. Buy more beans for a big pile of beans.',
          img: 'https://imgur.com/LEHS8h3.png',
          price: 5,
          qty: 99
        }, {
          name: 'Bones',
          description: 'It\'s just a bag of bones.',
          img: 'https://imgur.com/dalOqwk.png',
          price: 25,
          qty: 0
        }, {
          name: 'Bins',
          description: 'A stack of colorful bins for your beans and bones.',
          img: 'https://imgur.com/ptWDPO1.png',
          price: 7000,
          qty: 1
        }
      ]
    try {
      const seedItems = await Product.create(newProducts)
      res.send(seedItems)
    } catch (err) {
      res.send(err.message)
    }
  })
  
//Index
// index route
router.get("/", (req, res) => {
    // find all the products// Products refers to the collections. 
    Product.find({})
      // render a template after they are found
      .then((product) => {
        res.render("products/index", { product });
      })
      // send error as json if they aren't
      .catch((error) => {
        res.json({ error });
      });
  });
  // new route
  router.get("/new", (req, res) => {
    res.render("products/new");
  });
  
  // create route
  router.post("/", (req, res) => {
    
    // create the new fruit
    Product.create(req.body)
      .then((products) => {
        // redirect user to index page if successfully created item
        res.redirect("/store");
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });
  
  //Show 
  // show route
  router.get("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
  
    // find the particular fruit from the database
    Product.findById(id)
      .then((product) => {
        // render the template with the data from the database
        res.render("products/show", { product });
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
  
  //update route
  router.put("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // update the 
    Product.findByIdAndUpdate(id, req.body, { new: true })
      .then((product) => {
        // redirect to main page after updating
        res.redirect("/store");
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });
  
  //buy
  router.put("/:id/buy", (req, res) => {
    //get the id from params
    const id = req.params.id;
    Product.updateOne({_id: id},
        { $inc: { qty: -1 } })
        .then((product) => {
            // redirect to main page after updating
            res.redirect(`/store/${req.params.id}`);
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            res.json({ error });
        })
  })
  
  
  //delete
  router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // delete the fruit
    Product.findByIdAndRemove(id)
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
  
////////////////////////////////////////////
// Export Router
////////////////////////////////////////////
module.exports = router;