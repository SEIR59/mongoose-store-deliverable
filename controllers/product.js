const express = require('express')
const Product = require('../models/product')

const router = express.Router()

// Index Page
router.get('/', (req, res) => {
    Product.find({})
    .then((products) => {
        console.log(products)
        res.render('index', {products})
    })                       
    .catch((error) => {
        console.log(error)
        res.json({error})
    }) 
})

// Create Page
router.post('/', (req, res) => {
    Product.create(req.body)
    .then((products) => {
        res.redirect('/products')
    })
    .catch((error) => {
        console.log(error)
        res.json({error})
    })
})

// New Page
router.get('/new', (req, res) => {
    res.render('new')
})

// Edit Page
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    Product.findById(id)
    .then((product) => {
        res.render('edit', {product})
    })
    .catch((error) => {
        console.log(error)
        res.json({error})
    })
})

// Show Page
router.get('/:id', (req, res) => {
    const id = req.params.id
    Product.findById(id)
    .then((product) => {
        res.render('show', {product})
    })
    .catch((error) => {
        console.log(error)
        res.json({error})
    })
})

// Update Route
router.put('/:id', (req, res) => {
    const id = req.params.id
    Product.findByIdAndUpdate(id, req.body, {new: true})
    .then((product) => {
        res.redirect('/products')
    })
    .catch((error) => {
        console.log(error)
        res.json({error})
    })
})

// Delete Page
router.get('/:id', (req, res) => {
    const id = req.params.id
    Product.findByIdAndRemove(id)
    .then((product) => {
        res.redirect('/products')
    })
    .catch((error) => {
        console.log(error)
        res.json({error})
    })
})

module.exports = router