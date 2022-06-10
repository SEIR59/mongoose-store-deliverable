const mongoose = require("mongoose");
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make vampire schema
const productSchema = new Schema({
  name: {
      type:String,
      required:true
  },
  description: String,
  img: String,
  price: {
    type:Number,
    min:0
  },
  qty: {
    type:Number,
    min:0
  }
 
});

// make Vampire model
const Product = model("Product", productSchema);

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Product;
