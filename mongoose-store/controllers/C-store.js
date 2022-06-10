const express = require('express')
const router = express.Router()
const Products = require('../models/M-products')
console.log('in store controller')

//get routes

router.get('/', async (req, res) => {
    Products.find().then((products) => {
        res.render('items/index', {
            products: products
        })
    })
})

router.get('/new', (req, res) => {
    res.render('items/new', {

    })
})

router.get('/:id', (req, res) => {
    Products.findById(req.params.id).then((item) => {
        res.render('items/show', {
            item: item
        })
    }).catch((err) => {
        console.log(err)
    })

})

router.get('/:id/edit', (req, res) => {
    Products.findById(req.params.id).then((item) => {
        res.render('items/edit', {
            item: item
        })
    })

})

//others

router.post('/:id', (req, res) => {
    console.log('Bought')
    Products.updateOne({ _id: req.params.id }, { $inc: { qty: -1 } }).then(() => {
        res.redirect(`/store/${req.params.id}`)
    })
})

router.post('/' , (req,res)=>{
    const r = req.body
    Products.create({
        name:r.name,
        description:r.description,
        img:r.img,
        price:r.price,
        qty:r.qty
    }).then(()=>{
        res.redirect('/store')
    }).catch((err)=>{
        console.log(err)
        res.redirect('/store')
    })
})

router.post('/:id/edit', (req, res) => {
    Products.findOneAndUpdate({_id: req.params.id }, {
        $set:
        {
            name: req.body.name,
            description: req.body.description,
            img: req.body.img,
            price: req.body.price,
            qty: req.body.qty
        }
    }, { new: true }).then(() => {
        res.redirect(`/store/${req.params.id}`)
    })
})

router.delete('/:id', (req, res) => {
    Products.findByIdAndRemove(req.params.id).then(()=>{
        res.redirect('/store')
    })
})
module.exports = router