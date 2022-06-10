/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path")
const Product = require('./models/products');

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("server is running");
  });

//SEED Data
  app.get('/products/seed', async (req, res) => {
    const newProducts =
      [
        {
          name: 'Blue Cat Shirt',
          description: 'A small cat sweater.',
          img: 'https://i.etsystatic.com/11081978/r/il/856119/1892301071/il_794xN.1892301071_s54j.jpg',
          price: 15,
          qty: 89
        }, {
          name: 'Frog hat',
          description: 'Green Knitted Yarn frog hat for cats',
          img: 'https://i.etsystatic.com/24057414/r/il/2b2ba6/2584411373/il_794xN.2584411373_9xk1.jpg',
          price: 25,
          qty: 5
        }, {
          name: 'Striped Turtleneck',
          description: 'Striped Turtleneck, long sleeve sweater, Retro color scheme',
          img: 'https://i.etsystatic.com/28010461/r/il/501a8a/3310262347/il_794xN.3310262347_te2u.jpg',
          price: 30,
          qty: 8
        }
      ]
  // Delete all products
  Product.deleteMany({}).then((data) => {
    // Seed Starter Products
    Product.create(newProducts).then((data) => {
      // send created products as response to confirm creation
      res.json(data);
    });
  });
});
  
  // index route
app.get("/products", (req, res) => {
    Product.find({}, (err, products) => {
      res.render("products/index.liquid", { products });
    });
  });

  // new route
app.get("/products/new", (req, res) => {
    res.render("products/new.liquid");
  });


  //Delete route
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
  

  //update route - PUT
app.put("/products/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // update the product
    Product.findByIdAndUpdate(id, req.body, { new: true })
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

    //update route - PUT - BUY
app.put("/products/:id/buy", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // update the product
    Product.updateOne ({_id: id}, {$inc: {qty: -1}})
      .then((product) => {
        // redirect to main page after updating
        res.redirect(`/products/${id}`);
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
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
  
  // edit route
app.get("/products/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // get the fruit from the database
    Product.findById(id)
      .then((product) => {
        // render edit page and send product data
        res.render("products/edit.liquid", { product });
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });
  
  


  // show route
app.get("/products/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
  
    // find the particular product from the database
    Product.findById(id)
      .then((product) => {
        // render the template with the data from the database
        res.render("products/show.liquid", { product });
      })
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });
  

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
