const mongoose = require('/connection')

const { Schema, model } = mongoose

// Make Products Schema
const productsSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    img: String,
    price: {type: Number, min: .01},
    qty: {type: Number, min: 1}
})

// Make Fruit model // the " " argument becomes a collection
const Product = model("Product", productsSchema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Product;
