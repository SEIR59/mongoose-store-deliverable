/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path")

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DB = process.env.DATABASE_URL;
console.log(DB)
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Establish Connection
mongoose.connect(DB, CONFIG);

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make Products schema
const productsSchema = new Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  qty: Number
});

// make Products model
const Product = model("Product", productsSchema);


/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), {root: [path.resolve(__dirname, 'views/')]})

// /////////////////////////////////////////////////////
// // Middleware
// /////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("your server is running... better catch it.");
});

//Seed
app.get('/seed', async (req, res) => {
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
app.get("/store", (req, res) => {
  // find all the products
  Product.find({})
    // render a template after they are found
    .then((products) => {
      res.render("products/index.liquid", { products });
    })
    // send error as json if they aren't
    .catch((error) => {
      res.json({ error });
    });
});







//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));

