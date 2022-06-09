/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////

const mongoose = require("./connections.js"); //same value as if left here but now passing through new file


////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////

// pull schema and model from mongoose
//   const Schema = mongoose.Schema
//   const model = mongoose.model
//how you can create both at the same time instead of having to create the two seperate above ^
const { Schema, model } = mongoose;

// make products schema
const productsSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    img: String,
    price:{type: Number, min: 1},
    qty: {type: Number, min: 1},
});

// make fruit model
const Product = model("Product", productsSchema);


///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Product;
