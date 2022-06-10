//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require('./connection')

//////////////////////////////////////////////
// Define Model
//////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose

// make products schema
const productsSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: String,
    img: String,
    price: {
        type: Number,
        min: 0
    },
    qty: {
        type: Number,
        min: 0
    }
})

// make product model
const Product = model("Product", productsSchema)

////////////////////////////////////////////////
// Export model
////////////////////////////////////////////////
module.exports = Product