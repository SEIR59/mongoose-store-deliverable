/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////

const mongoose = require("./connections.js")

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

model.exports = Product;