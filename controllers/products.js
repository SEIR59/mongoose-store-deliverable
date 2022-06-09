// import dependencies
const { response } = require("express")
const express = require("express")
const Product = require("../models/products.js")

// create router
const router = express.Router()

// seed route
router.get("/seed", (req, res) => {
    // array of starter fruits
    const newProducts =
        [
            {
                name: 'Beans',
                description: 'A small pile of beans. Buy more beans for a big pile of beans.',
                img: 'https://imgur.com/LEHS8h3.png',
                price: 5,
                qty: 99
            }, {
                name: 'Bones',
                description: 'It\'s just a bag of bones.',
                img: 'https://imgur.com/dalOqwk.png',
                price: 25,
                qty: 0
            }, {
                name: 'Bins',
                description: 'A stack of colorful bins for your beans and bones.',
                img: 'https://imgur.com/ptWDPO1.png',
                price: 7000,
                qty: 1
            }
        ]

    // Delete all fruits
    Product.deleteMany({}).then((data) => {
        // Seed Starter Fruits
        Product.create(newProducts).then((data) => {
            // send created fruits as response to confirm creation
            res.json(newProducts);
        })
    })
})

// index route
router.get("/", (request, response) => {
    response.render("products/index", {
        products: Product.find({})
    })
})

// new route
router.get("/new", (request, response) => {
    response.render("products/new")
})

// destroy route
router.delete("/:id", (request, response) => {
    response.send("deleted route")
})

// update route
router.put("/:id", (request, response) => {
    response.send("update route")
})

// create route
router.post("/", (request, response) => {
    Product.create(request.body)
    .then((data) => {
        response.redirect('/products')
    })
    .catch((error) => {
        console.log(error);
        res.json({ error });
    });
})

// edit route
router.get("/:id/edit", (request, response) => {
    response.render("products/edit")
})

// show route
router.get("/:id", (request, response) => {
    response.render("products/show")
})

// export the router
module.exports = router