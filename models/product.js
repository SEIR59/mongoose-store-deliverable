const mongoose = require('./connection')

// MODELS

const { Schema, model } = mongoose

//products schema
const productsSchema = new Schema({
    name: String,
    description: String,
    img: String,
    price: Number,
    qty: Number
})

// products model
const Product = model('Product', productsSchema)

module.exports = Product