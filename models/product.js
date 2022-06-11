const mongoose = require('./router')

const { Schema, model } = mongoose

const productsSchema = new Schema({
    name: { type: String, required: true},
    description: String,
    img: String,
    price: { type: Number},
    qty: {type: Number, min: 0}
})

const Product = model("Product", productsSchema)

module.exports = Product