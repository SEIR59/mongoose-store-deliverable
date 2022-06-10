/////////////////////////////////
// import dependencies
/////////////////////////////////
const mongoose = require('./connection')

/////////////////////////////////
// define our products model
/////////////////////////////////
// pull the schema and model constructors from mongoose
// we're going to use something called destructuring to accomplish this
const { Schema, model } = mongoose

// make our products schema
const productSchema = new Schema({
    name: { type: String },
    description: { type: String},
    img: { type: String },
    price: { type: Number },
    qty: { type: Number },
}, { timestamps: true })

// make our product model
const Product = model("Product", productSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Product