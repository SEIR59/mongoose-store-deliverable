const express = require("express")
const Product = require("../models/product")

const router = express.Router()

router.get("/seed", (req, res) => {
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
        Product.create(newProducts).then((data) => {
            res.json(newProducts)
        })
})
// Index route
router.get("/", (req, res) => {
    res.render('products/index', {
        products: Product.find({})
    })
})

// New route
router.get("/new", (req, res) => {
    res.render("products/new")
})

// Delete route
router.delete("/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then((product) => {
            res.redirect("/products");
        })
        .catch((error) => {
            console.log(error);
        });
})

//Update route
router.put("/:id", (req, res) => {
    Product.updateOne({_id: req.params.id}, 
        {$set: {
            qty: req.body.qty, 
            name: req.body.name, 
            img: req.body.img,
            description: req.body.description,
            price: req.body.price
        }})
        .then((product) => {
            res.redirect("/products");
        })
        .catch((error) => {
            console.log(error);
        });
})

//Create route
router.post('/', (req, res) => {
    Product.create(req.body)
    .then((data) => {
        res.redirect('/products')
    })
    .catch((err) => {
        console.log(err)
    })
})

//Edit Route
router.get("/:id/edit", (req, res) => {
    Product.find({name: req.params.id})
    .then((product) => {
        res.render("products/edit", {
            product: product
        })
    })
})

//Show route
router.get("/:id", (req, res) => {
    Product.findById(req.params.id)
        .then((product) => {
            res.render("products/show", {
                product: product
            })
        })
        .catch((error) => {
            console.log(error);
        })
})

module.exports = router
