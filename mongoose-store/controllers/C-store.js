const express = require('express')
const Product = require('../models/M-products')
const router = express.Router()

console.log('in store controller')

router.get('/' , (req,res)=>{
    res.render('items/index', {

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

router.delete('/' , (req,res)=>{
    res.redirect('/')
})
module.exports = router