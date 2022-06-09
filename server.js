require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const mongoose = require("mongoose");
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override")
const path = require("path")

const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(DATABASE_URL, CONFIG);

mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error))

  const {
    Schema,
    model
} = mongoose;

const productsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    img: String,
    price: {
        type: Number,
        min: 0
    },
    qty: {
        type: Number,
        min: 0
    }

})

const Product = model('Product', productsSchema)

const app = require("liquid-express-views")(express(), {root: [path.resolve(__dirname, 'views/')]})

app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

app.get("/", (req, res) => {
    res.send("your server is running... better catch it.");
  });

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));