const express = require('express')
const Product = require('../models/product')

// CREATE ROUTE

const router = express.Router()


// ROUTES

// index route 
router.get('/', (req, res) =>{
    //find all the products
    Product.find({})
    .then(products => {
        console.log(products)
        res.render('products/index.liquid', {products})
    })
    .catch(error => console.log(error))
})

// new route
router.get('/new', (req, res) => res.render('products/new.liquid'))


// delete route
router.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id)
    .then(product => res.redirect('/products'))
    .catch(error => console.log(error))
})

//update route
router.put('/:id', (req, res) => {
    const id = req.params.id
    Product.findByIdAndUpdate(id, req.body, {new: true})
    .then(product => res.redirect(`/products/:${id}`))
    .catch(error => console.log(error))
})

// create route
router.post('/', (req, res) => {
    Product.create(req.body)
    .then(product => {
        res.redirect('/products')
    })
    .catch(error => console.log(error)) 
})

// edit route
router.get('/:id/edit', (req, res) => {
    Product.findById(req.params.id)
    .then(product => res.render('products/edit.liquid', {product}))
    .catch(error => console.log(error))
})

// show route
router.get('/:id', (req, res) => {
    Product.findById(req.params.id)
    .then(product => res.render('product/show.liquid', {product}))
    .catch(error => console.log(error))
})




// export router to server.js
module.exports = router