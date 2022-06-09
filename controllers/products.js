////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const { start } = require("repl");
const Product = require("../models/product.js");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();
//change all instances of router. get etc, to router


/////////////////////////////////////////
// Routes - all fruit routes specifically
/////////////////////////////////////////

//SEED NEEDS TO BE NEAR THE TOP
//any time you go to this link, it will delete all data and then add in only the data listed below
//used to test that database is working without having to create new create page, add in data and then test
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
          qty: 1
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

// Index Route / The Async/Await Method

// // index route / will only show the loggin in user fruits
router.get("/", async (req, res) => {
    //async looks for any kind of awaits - async knows it has to wait for await to finsh running before it will run it's function
    const products = await Product.find({}); // Fruits.find({}) takes a long time to run
    // await has it wait a second allowing Fruits.find({}) to run before it runs allowing the data to be retrived from the database
    res.render("products/index.liquid", { products });
  });


//NEW ROUTE
router.get("/new", (req, res) => {
  res.render("products/new");
});

//DELETE ROUTE
router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the fruit
  Product.findByIdAndRemove(id)
    .then((fruit) => {
      // redirect to main page after deleting
      res.redirect("/products");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// // CREATE route
router.post("/", (req, res) => {
  // create the new product
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

// EDIT ROUTE
// router.get("/:id/edit", (req, res) => {
//   // get the id from params
//   const id = req.params.id;
//   // get the fruit from the database
//   Fruit.findById(id)
//     .then((fruit) => {
//       // render edit page and send fruit data
//       res.render("fruits/edit.liquid", { fruit });
//     })
//     // send error as json
//     .catch((error) => {
//       console.log(error);
//       res.json({ error });
//     });
// });

// PUT ROUTE
//update route
// router.put("/:id", (req, res) => {
//   // get the id from params
//   const id = req.params.id;
//   // check if the readyToEat property should be true or false
//   req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
//   // update the fruit
//   Fruit.findByIdAndUpdate(id, req.body, { new: true })
//     .then((fruit) => {
//       // redirect to main page after updating
//       res.redirect("/fruits");
//     })
//     // send error as json
//     .catch((error) => {
//       console.log(error);
//       res.json({ error });
//     });
// });



//SHOW ROUTE SHOULD ALWAYS BE NEAR TO BOTTOM TO AVOID MESS UP WITH EARLIER PAGES
// show route
// router.get("/:id", (req, res) => {
//   // get the id from params
//   const id = req.params.id;

//   // find the particular fruit from the database
//   Fruit.findById(id)
//     .then((fruit) => {
//       // render the template with the data from the database
//       res.render("fruits/show.liquid", { fruit });
//     })
//     .catch((error) => {
//       console.log(error);
//       res.json({ error });
//     });
// });

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router; //router contains all info in here
