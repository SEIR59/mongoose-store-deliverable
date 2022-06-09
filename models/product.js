const mongoose = require("mongoose"); // require mongoose
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor
const model = mongoose.model; // shorthand for model function

// create a new Schema

const productSchema = new Schema(
  {
    name: String,
    description: String,
    img: String,
    price: Number,
    qty: Number,
  },
  { timestamps: true }
);

// Model's are fancy constructors compiled from Schema definitions
// An instance of a model is called a document.
// Models are responsible for creating and reading documents from the underlying MongoDB Database
// from here: https://mongoosejs.com/docs/models.html
const Product = model("Product", productSchema);

//make this exportable to be accessed in `app.js`
module.exports = Product;
