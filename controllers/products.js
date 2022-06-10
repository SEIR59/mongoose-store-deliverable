////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Product = require("../models/product");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////
// index route
router.get("/", (req, res) => {
  Product.find({})
    .then((products) => {
      res.render('products/index', {
        products
      })
    })
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})

// new route
router.get('/new', (req, res) => {
  const id = req.params.id
  Product.findById(id)
    .then((product) => {
      res.render('products/new', {
        product
      })
    })
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})

// create route
router.post('/', (req, res) => {
  Product.create({
    name: req.body.name,
    description: req.body.description,
    img: req.body.img,
    price: req.body.price,
    qty: req.body.qty,

  }, (error, product) => {
    if (error) {
      console.log(error)
    }
    else {
      res.redirect('/products')
    }
  })
  console.log(req.body.name)
})

// show route
router.get('/:id', (req, res) => {
  const id = req.params.id
  Product.findById(id)
    .then((product) => {
      res.render('products/show', {
        product
      })
    })
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})

// edit route
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Product.findById(id)
    .then((product) => {
      res.render('products/edit', {
        product
      })
    })
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})

// // buy route
// router.put('/:id', (req, res) => {
//   const id = req.params.id
//   console.log('SUCCESSFULLY RAN BUY ROUTE START')
//   Product.findByIdAndUpdate(id, { $dec: { qty: -1 }} )
//     .then((product) => {
//       // product.update(

//       // )
//       res.redirect('products/show', {
//         product
//       })
//     })
//     .catch((error) => {
//       console.log(error)
//       res.json({ error })
//     })
// })



// update route
router.put('/:id', (req, res) => {
  const id = req.params.id
  console.log(req.body.name)

  Product.findByIdAndUpdate(id, {
    name: req.body.name,
    description: req.body.description,
    img: req.body.img,
    price: req.body.price,
    qty: req.body.qty,

  }, (error, product) => {
    if (error) {
      console.log(error)
    }
    else {
      res.redirect(`/products/${id}`)
    }
  })
})

// delete route
router.delete('/:id', (req, res) => {
  const id = req.params.id
  console.log(req.body.name)

  Product.findByIdAndRemove(id, (error, product) => {
    if (error) {
      console.log(error)
    }
    else {
      res.redirect('/products')
    }
  })
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router
