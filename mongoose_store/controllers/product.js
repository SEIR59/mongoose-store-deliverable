const express = require('express')
const Product = require('../models/product')

const router = express.Router()



router.get('/', (req, res) => {
    Product.find({})
    .then((products) => {
        res.render('products/index.liquid', {products})
    })
    .catch((error) => {
        console.log(error)
    })
})

router.get('/new', (req, res) => {
    res.render('products/new.liquid')
})

router.post('/', (req, res) => {
    console.log(req.body)
    Product.create(req.body)
        .then((products) => {
            res.redirect('/products')
        })
        .catch((error) => {
            console.log(error)
        })
})

router.put("/:id/buy", (req, res) => {
    const id = req.params.id
    Product.findByIdAndUpdate(id, { $inc: { qty: -1 } })
        .then(products => {
            res.redirect('/products/:id')
        })
        .catch(error => res.json(error))
})

router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    Product.findById(id)
        .then((product) => {
            res.render('/products/edit', {product})
        })
        .catch((error) => {
            console.log(error)
        })
})

router.put("/:id", (req, res) => {
    const id = req.params.id
    Product.findByIdAndUpdate(id, req.body, { new: true })
        .then((product) => {
            console.log(product)
            res.redirect("/products")
        })
        .catch((error) => {
            console.log(error)

        })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    Product.findOneAndUpdate(id)
        .then((product) => {
            console.log(product)
            res.redirect("/products")
        })
        .catch
        ((error) => {
            console.log(error)
        })
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    Product.findById(id)
        .then((product) => {
            res.render("products/show", {product})
        })
        .catch((error) => {
            console.log(error)
        })
})


module.exports = router