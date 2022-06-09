/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path")

/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), {root: [path.resolve(__dirname, 'views/')]})


/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG);

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));



// MIDDLEWARE
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically


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



// ROUTES
app.get('/products', (req, res) => {
    Product.find({})
    .then(products => {
        res.render('index.liquid', { products })
    })
    .catch(error => console.log(error))
})

// create a seed route
app.get("/products/seed", (req, res) => {
    // array of starter fruits
    const startProducts = [
      {
          name: 'Coke',
          description: '12oz can of Coca Cola',
          img: 'https://media.istockphoto.com/photos/coke-picture-id458464735?k=20&m=458464735&s=612x612&w=0&h=CW8rzEiIMvuO23X9I3b6U_g2aBUQSZnWYLjWauLMxtg=',
          price: 1.25,
          qty: 12
      },
      {
          name: 'Pepsi',
          description: '12oz can of Pepsi',
          img: 'https://i5.walmartimages.com/asr/3bcc0155-c9d4-420d-a72d-b51df2f74272.b6728445b72558acb521af846c99591b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
          price: 1.50,
          qty: 20
      },
      {
        name: 'Sprite',
        description: '12oz can of Sprite',
        img: 'https://i5.walmartimages.com/asr/daa7d872-178d-4cfb-a90f-62bb7ffc58ff.9153c6dc42b8d21a586ae13261e2db9d.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
        price: 1.50,
        qty: 6
      }
    ];
  
    // Delete all fruits
    Product.deleteMany({}).then((data) => {
      // Seed Starter Fruits
      Product.create(startProducts).then((data) => {
        // send created fruits as response to confirm creation
        res.json(data);
      });
    });
  });
  



// Listen Route
const PORT = 3000;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
