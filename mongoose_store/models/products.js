//? pull schema and model from mongoose
const mongoose = require('./connection');

const { Schema, model } = mongoose;

//? make products schema
const productsSchema = new Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  qty: Number,
});

//? make products model
module.exports = model('Products', productsSchema);
