const express = require('express')
const Product = require('../models/product')

// CREATE ROUTE

const router = express.Router()


// ROUTES

router.get('/', (req, res) =>{
    //find all the products
    Product.find({})
    .then(products => {
        console.log(products)
        res.render('products/index.liquid', {products})
    })
    .catch(error => console.log(error))
})

module.exports = router