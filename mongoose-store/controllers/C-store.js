const express = require('express')
const router = express.Router()
const Products = require('../models/M-products')
console.log('in store controller')

//get routes

router.get('/' , async (req,res)=>{
    Products.find().then((products)=>{
        res.render('items/index', {
            products : products
    })
    })
})

router.get('/new' , (req,res)=>{
    res.render('items/new' , {
        
    })
})

router.get('/:id' , (req,res)=>{
    res.render('items/show', {

    })
})

router.get('/:id/edit', (req,res)=>{
    res.render('items/edit' , {

    })
})

//others

router.post('/:id' , (req,res)=>{
    //logic
    res.redirect('/:id')
})

router.delete('/:id' , (req,res)=>{
    res.redirect('/')
})

router.post('/' , (req,res)=>{
    //logic
    res.redirect('/')
})
module.exports = router