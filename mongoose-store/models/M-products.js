const mongoose = require('./M-connection')
const { Schema, model } = mongoose


const productSchema = new Schema({
    name: {type:String, require:true},
    description: String,
    img: String,
    price: {type:Number, min:0, required:true},
    qty: {type:Number, min:0, required:true}
})

module.exports = model('Product', productSchema)