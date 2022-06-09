/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const path = require('path')
const storesRouter = require('./controllers/products.js')
/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require('liquid-express-views')(express())

//////////////////////////////////≠///////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically
///////////////////////////////////////////////////
//ROUTERS
///////////////////////////////////////////////////
app.use('/store', storesRouter)

app.get("/", (req, res) => {
    res.render("index.liquid")
  })


//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Now listening on port ${PORT}')
})