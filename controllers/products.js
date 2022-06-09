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
    Product.findByIdAndRemove(request.params.id)
        .then((product) => {
            // redirect to main page after deleting
            response.redirect("/products");
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            response.json({ error });
        });
})

// update route
router.put("/:id", (request, response) => {
    Product.updateOne({_id: request.params.id}, 
        {$set: {
            qty: request.body.qty, 
            name: request.body.name, 
            img: request.body.img,
            description: request.body.description,
            price: request.body.price
        }})
        .then((product) => {
            // redirect to main page after updating
            console.log(product)
            response.redirect("/products");
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            response.json({ error });
        });
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
    Product.findById(request.params.id)
        .then((product) => {
            response.render("products/edit", {
                product: product
            })
        })
})

// show route
router.get("/:id", (request, response) => {
    Product.findById(request.params.id)
        .then((product) => {
            response.render("products/show", {
                product: product
            })
        })
        .catch((error) => {
            console.log(error);
            res.json({ error });
        })
})

// export the router
module.exports = router