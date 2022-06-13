/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const mongoose = require('./models/connection');//still need
const path = require("path")

const ProductRouter = require("./controllers/products")
const SeedRouter = require("./controllers/seeds")


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

app.use("/products",ProductRouter)
app.use("/seed",SeedRouter)

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Now Listening on port ${PORT}`)
  routesReport.print()
});

