/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path")
const Product = require('./models/product');
const newProducts = require('./models/seed');


/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG);

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));

/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), {root: [path.resolve(__dirname, 'views/')]})

const rowdy = require('rowdy-logger')
const routesReport = rowdy.begin(app)


/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically



//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Now Listening on port ${PORT}`)
  routesReport.print()
});

//////////////////////////////////////////////
// Seed
//////////////////////////////////////////////
app.get('/seed', async (req, res) => {
 
  try {
    const seedItems = await Product.create(newProducts)
    res.send(seedItems)
    console.log(seedItems)
  } catch (err) {
    res.send(err.message)
  }
})

// Route //

//////////////////////////////////////////////
// Index Route
//////////////////////////////////////////////
app.get("/products", (req, res) => {
  
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
app.get("/products/new", (req, res) => {
  res.render("new");
});


// create route
app.post("/products", (req, res) => {
  
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

app.get("/products/:id/edit", (req, res) => {
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
app.put("/products/:id", (req, res) => {
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
app.get("/products/:id", (req, res) => {
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
app.delete("/products/:id", (req, res) => {
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
app.put("/products/:id/buy", (req, res) => {
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