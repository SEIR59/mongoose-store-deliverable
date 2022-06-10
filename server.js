/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const path = require("path");
const ProductRouter = require('./controllers/products')

// const rowdy = require('rowdy-logger')
// const routesReport = rowdy.begin(ProductRouter)
/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////

const app = require("liquid-express-views")(express(), {
  root: [path.resolve(__dirname, "views/")],
});

// ### Register our Middleware

// ```js
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
app.use('/products', ProductRouter) // send all "/fruits" routes to fruit router

app.get("/", (req, res) => {
  res.send("your server is running... better catch it.");
//   res.render('index')
});

const port = process.env.PORT
app.listen(port, () => {
    console.log(`port 3000 listens`)
    // routesReport.print(ProductRouter)
})