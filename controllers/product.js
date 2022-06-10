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
            res.render("index.liquid", { products })
        })
        .catch((error) => {
            console.log(error)
            res.json({ error })
        });
});

// create route

router.post("/", (req, res) => {
    Product.create(req.body)
        .then((products) => {
            res.redirect("/products")
        })
        .catch((error) => {
            console.log(error)
            res.json({ error })
        })
})

// New route
router.get("/new", (req,res) => {
    res.render("new.liquid")
})

// Buy
router.put("/:id/buy", (req, res) => {
    const id = req.params.id;
    Product.updateOne({ _id: id }, { $inc: { qty: 0 }})
        .then((products) => {
            res.redirect(`/products/${id}`)
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
            res.render("show.liquid", { products })
        })
        .catch((error) => {
            console.log(error)
            res.json({ error })
        })
})


module.exports = router