/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const mongoose = require("./connection")
const Schema = mongoose.Schema
const model = mongoose.model

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
// const Schema = mongoose.Schema
// const model = mongoose.model
// is equal to:

const productsSchema = new Schema(
    { 
        name: {
            type: String,
            required: true,
        },
        description: String,
        img: String,
        price: {
            type: Number,
            min: 0,
        },
        qty: {
            type: Number,
            min: 0,
        } 
    }
)

const Product = model("Product", productsSchema)

module.exports = Product



