/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const path = require('path')
const Product = require('./models/products')


/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require('liquid-express-views')(express()),

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically
// middleware to setup session
app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    saveUninitialized: true,
    resave: false,
  })
);

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log('Now listening on port ${PORT}'))
