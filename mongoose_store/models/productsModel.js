//? pull schema and model from mongoose
const mongoose = require('./connection');

const { Schema, model } = mongoose;

//? make products schema
const productsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  img: String,
  price: {
    type: Number,
    min: 1,
  },
  qty: {
    type: Number,
    min: 1,
  },
});

//? make products model
module.exports = model('Products', productsSchema);
