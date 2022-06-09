/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const mongoose = require("./connection"); //mongoose from connection!

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make product schema
const productSchema = new Schema({
  name: String,
  descprition: String,
  img: String,
  price: {
    type: Number,
    min: 0,
  },
  qty: {
    type: Number,
    min: 0,
  },
});

const ProductModel = model("Product", productSchema);

module.exports = ProductModel;
