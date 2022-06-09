// import dependencies
const mongoose = require("./connections.js")

// pull schema and model from mongoose
const { Schema, model } = mongoose

// make product schema
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name!']
    },
    description: String,
    img: String,
    price: {
        type: Number,
        min: [0, 'Not a valid price']
    },
    qty: {
        type: Number,
        min: [0, 'Not a valid quantity']
    }
})

// make product model
const Product = model("Product", productSchema)

// export product
module.exports = Product