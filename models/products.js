////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const Fruit = require('../models/products')
const mongoose = require("mongoose");

///////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make products schema
const productsSchema = new Schema({
  name: {type: String, required: true},
  description: String,
  img: String,
  price: {type: Number, min: 1},
  qty: {type: Number, min: 1}
});

// make product model
const Product = model("Product", productsSchema);

module.exports = Product;