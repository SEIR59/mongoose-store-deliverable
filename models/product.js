/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const mongoose = require("./connections")

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
// const Schema = mongoose.Schema
// const model = mongoose.model
//is equal to;
const { Schema , model } = mongoose

// Make fruits schema
const storeSchema = new Schema({
    name: String,
    description: String,
    img: String,
    price: Number,
    qty: Number
})
const Store = model("Store", storeSchema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Store;