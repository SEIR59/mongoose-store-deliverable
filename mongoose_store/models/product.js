const mongoose = require('mongoose')

const {Schema, model} = mongoose

const productSchema = new Schema(
    {
    name: {type: String, required: true},
    description: String,
    img: String,
    price: {type: Number, min: 0},
    qty: {type: Number, min: 0}
})

 const Product = model('product', productSchema )

 module.exports = Product