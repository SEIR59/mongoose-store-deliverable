////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Product = require("../models/products.js")


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
            res.render("index.liquid", { products });
        })
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});

// create route

router.post("/", (req, res) => {
    Product.create(req.body)
        .then((products) => {
            res.redirect("/products")
        })
        .catch((error) => {
            console.log(error);
            res.json({ error });
        })
})

// New route
router.get("/new", (req,res) => {
    res.render("products/new.liquid")
})



module.exports = router