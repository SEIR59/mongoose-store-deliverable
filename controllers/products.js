const express = require("express");
const Product = require("../models/products");

const router = express.Router();

router.get("/seed", (req, res) => {
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
router.get("/", (req, res) => {
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
router.get("/new", (req, res) => {
  res.render("products/new.liquid");
});

// create route
router.post("/", (req, res) => {
  Product.create(req.body)
    .then((products) => {
      res.redirect("/products");
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// edit route
router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the fruit from the database
  Product.findById(id)
    .then((product) => {
      // render edit page and send fruit data
      res.render("products/edit.liquid", { product });
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//update route
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  Product.findByIdAndUpdate(id, req.body, { new: true })
    .then((product) => {
      // redirect to main page after updating
      res.redirect("/products");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  Product.findByIdAndRemove(id)
    .then((product) => {
      // redirect to main page after deleting
      res.redirect("/products");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// show route
router.get("/:id", (req, res) => {
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

module.exports = router;
