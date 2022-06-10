require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const mongoose = require("mongoose");
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const path = require("path");

const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(DATABASE_URL, CONFIG);

mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));

const { Schema, model } = mongoose;

const productsSchema = new Schema({
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
  },
});

const Product = model("Product", productsSchema);

const app = require("liquid-express-views")(express(), {
  root: [path.resolve(__dirname, "views/")],
});

app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(
  express.urlencoded({
    extended: true,
  })
); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

app.get("/", (req, res) => {
  res.send("your server is running... better catch it.");
});

app.get("/seed", (req, res) => {
  const newProducts = [
    {
      name: "Beans",
      description:
        "A small pile of beans. Buy more beans for a big pile of beans.",
      img: "https://imgur.com/LEHS8h3.png",
      price: 5,
      qty: 99,
    },
    {
      name: "Bones",
      description: "It's just a bag of bones.",
      img: "https://imgur.com/dalOqwk.png",
      price: 25,
      qty: 0,
    },
    {
      name: "Bins",
      description: "A stack of colorful bins for your beans and bones.",
      img: "https://imgur.com/ptWDPO1.png",
      price: 7000,
      qty: 1,
    },
  ];

  Product.deleteMany({}).then((data) => {
    Product.create(newProducts).then((data) => {
      res.json(data);
    });
  });
});

// index route
app.get("/products", (req, res) => {
    Product.find({})
      // render a template after they are found
      .then((products) => {
        res.render("products/index.liquid", { products });
      })
      // send error as json if they aren't
      .catch((error) => {
        res.json({ error });
      });
  });

  // new route
app.get("/products/new", (req, res) => {
    res.render("products/new.liquid");
  });

  // show route
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    Product.findById(id)
      .then((product) => {
        // render the template with the data from the database
        res.render("products/show.liquid", { product });
      })
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });

  // create route
app.post("/products", (req, res) => {
    Product.create(req.body)
      .then((products) => {
        res.redirect("/products");
      })
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
