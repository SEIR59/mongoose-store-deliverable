const express = require("express");
const Product = require("../models/products");

const router = express.Router();

router.get("/seed", (req, res) => {
  const newMoreProducts = [
    {
      name: "Brown Sugar Boba",
      description: "A cute brown sugar boba cup.",
      img: "https://ih1.redbubble.net/image.1006767423.1372/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
      price: 15,
      qty: 100,
    },
    {
      name: "Strawberry Milk Boba",
      description: "A cute little pink strawberry milk tea.",
      img: "https://ih1.redbubble.net/image.846498888.6828/raf,750x1000,075,t,FFFFFF:97ab1c12de.u2.jpg",
      price: 17,
      qty: 3,
    },
    {
      name: "Cat Boba Cup",
      description: "A cat boba cup.",
      img: "https://media.dayoftheshirt.com/images/shirts/9nDCm/teepublic_cute-kawaii-bubble-tea-boba-milk-cat-lover-gift-idea-teepublic_1576507293.large.png",
      price: 25,
      qty: 6,
    },
  ];

  Product.deleteMany({}).then((data) => {
    Product.create(newMoreProducts).then((data) => {
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

//buy
router.put("/:id/buy", (req, res) => {
  const id = req.params.id;
  Product.updateOne({ _id: id }, { $inc: { qty: -1 } })
    .then((products) => {
      res.redirect(`/products/${id}`);
    })
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
