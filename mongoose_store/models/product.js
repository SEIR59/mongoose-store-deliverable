/*========================================
        Require Dependencies
========================================*/
const mongoose = require("./connection")

/*========================================
        Functions for Schema
        for future use
========================================*/
// const convertPrice = (number) => {
//     return (number/100).toFixed(2)
// }
// const convertPriceDB = (number) => {
//     return (number*100)
// }
/*========================================
        Set Up Schema and Model
========================================*/
// set variables from mongoose
const { Schema, model } = mongoose

// make product Schema
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        maxlength: 300,
        minlength: 1,
        required: true,
    },
    img: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/2560px-Question_Mark.svg.png",
    },
    price: {
        type: Number,
        min: 000,
        // truePrice: convertPrice, // function to convert number to dollar and cents.
        required: true,
    },
    qtyAvailable: {
        type: Number,
        min: 0,
        required: true,
    },
    //username: String
})

// make model for Product
const Product = model("product", productSchema)

/*========================================
        Export Models
========================================*/
module.exports= Product