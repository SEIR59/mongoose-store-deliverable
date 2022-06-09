const mongoose = require('../models/connection')

const {Schema, model} = mongoose

const productSchema = new Schema({
    name: {type: String, required: true}, 
    description: String,
    img: String,
    price: Number,
    qty: Number
})

const Product = model('Product', productSchema)

module.exports = Product