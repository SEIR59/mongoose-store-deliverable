/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////

require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const mongoose = require("./models/connection");
const path = require("path");
const Product = require("./models/product");

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose

const { Schema, model } = mongoose;

/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), {
  root: [path.resolve(__dirname, "views/")],
});

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
  res.send("your server is running... better catch it.");
});

// index route
app.get("/products", (req, res) => {
  // find all the fruits
  Product.find()
    // render a template after they are found
    .then((products) => {
      console.log(products);
      res.render("products/index.liquid", { products });
    })
    // send error as json if they aren't
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// // new route
app.get("/products/new", (req, res) => {
  res.render("products/new.liquid");
});

// show route
app.get("/products/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  function buy(number) {
    return number--;
  }
  // find the particular fruit from the database
  Product.findById(id)
    .then((product) => {
      // render the template with the data from the database
      res.render("products/show.liquid", {
        product,
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// post server for change qty
app.put("/products/:id", async (req, res) => {
  const id = req.params.id;

  await Product.findByIdAndUpdate(id, { $inc: { qty: -1 } }, { new: true });

  res.redirect(`/products/${id}`);
});

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
