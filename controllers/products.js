// import dependencies
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
    response.send("eyo bonk.io?")
})

// export the router
module.exports = router