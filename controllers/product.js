////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Product = require("../models/products")


/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()


////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
    next()
})

// index route
router.get("/", (req, res) => {
Product.find({})
        .then((products) => {
            console.log(products)
            res.render("index", { products })
        })
        .catch((error) => {
            console.log(error)
            res.json({ error })
        })
})


// New route
router.get("/new", (req, res) => {
    res.render("new")
  })
// create route

router.post("/", (req, res) => {
    Product.create(req.body)
      .then((products) => {
        res.redirect("/products")
      })
      .catch((error) => {
        console.log(error);
        res.json({ error })
      })
  })


// edit route
router.get("/:id/edit", (req, res) => {
    const id = req.params.id;
    Product.findById(id)
      .then((product) => {
        res.render("edit", { product});
      })
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });


// Update route
router.put("/products/:id", (req, res) => {
    const id = req.params.id;
    Product.findByIdAndUpdate(id, req.body,{ new: true })
      .then((product) => {
        res.redirect("/products")
      })
      .catch((error) => {
        console.log(error)
        res.json({ error })
      })
  })


//Delete
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Product.findByIdAndRemove(id)
      .then((product) => {
        res.redirect("/products")
      })
      .catch((error) => {
        console.log(error)
        res.json({ error })
      })
  })


// Buy
router.put("/:id/buy", (req, res) => {
    const id = req.params.id;
    Product.findByIdAndUpdate(id,{$inc:{qty:-1}},{new:true})
    .then((product) => {
      res.redirect("/products");
      console.log()
    })
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})
        

// Show route
router.get("/:id", (req, res) => {
    const id = req.params.id;
    Product.findById(id)
        .then((products) => {
            res.render("show.liquid", { products });
        })
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});


module.exports = router