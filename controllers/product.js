////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const Product = require('../models/product')

////////////////////////////////////////////
// Create router
////////////////////////////////////////////
const router = express.Router()

////////////////////////////////////////////
// Router Middleware
////////////////////////////////////////////
// create some middleware to protect these routes
// Authorization middleware
router.use((req, res, next) => {
	// checking the loggedin boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/user/login')
	}
})

////////////////////////////////////////////
// Routes
////////////////////////////////////////////

// index ALL products route
router.get('/', (req, res) => {
	// find the products
	Product.find({})
		// then render a template AFTER they're found
		.then((products) => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			// console.log(products)
			res.render('products/index', { products, username, loggedIn })
		})
		// show an error if there is one
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

// index that shows only the user's products
router.get('/mine', (req, res) => {
	// find the products
	Product.find({ username: req.session.username })
		// then render a template AFTER they're found
		.then((products) => {
			// console.log(products)
			const username = req.session.username
			const loggedIn = req.session.loggedIn

			res.render('products/index', { products, username, loggedIn })
		})
		// show an error if there is one
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const username = req.session.username
	const loggedIn = req.session.loggedIn
	res.render('products/new', { username, loggedIn })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	// now that we have user specific products, we'll add the username to the product created
	req.body.username = req.session.username
	Product.create(req.body)
		.then((product) => {
			console.log('this was returned from create', product)
			res.redirect('/products')
		})
		.catch((err) => {
			console.log(err)
			res.json({ err })
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const productId = req.params.id
	// find the product
	Product.findById(productId)
		// -->render if there is a product
		.then((product) => {
			console.log('edit product', product)
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			res.render('products/edit', { product, username, loggedIn })
		})
		// -->error if no product
		.catch((err) => {
			console.log(err)
			res.json(err)
		})
})

// update route -> sends a put request to our database
router.put('/:id', (req, res) => {
	// get the id
	const productId = req.params.id
	// check and assign the readyToEat property with the correct value
	req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
	// tell mongoose to update the product
	Product.findByIdAndUpdate(productId, req.body, { new: true })
		// if successful -> redirect to the product page
		.then((product) => {
			console.log('the updated product', product)

			res.redirect(`/products/${product.id}`)
		})
		// if an error, display that
		.catch((error) => res.json(error))
})

router.put('/:id/buy', (req, res) => {
	// get the id
	const productId = req.params.id
	// tell mongoose to update the product
	Product.updateOne({_id: productId}, {$inc:{qty: -1} })
		// if successful -> redirect to the product page
		.then((product) => {
			res.redirect(`/products/${product.id}`)
		})
		// if an error, display that
		.catch((error) => res.json(error))
})

// show route
router.get('/:id', (req, res) => {
	// first, we need to get the id
	const productId = req.params.id
	// then we can find a product by its id
	Product.findById(productId)
		// once found, we can render a view with the data
		.then((product) => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn

			res.render('products/show', { product, username, loggedIn })
		})
		// if there is an error, show that instead
		.catch((err) => {
			console.log(err)
			res.json({ err })
		})
})

// delete route
router.delete('/:id', (req, res) => {
	// get the product id
	const productId = req.params.id
	// delete the product
	Product.findByIdAndRemove(productId)
		.then((product) => {
			console.log('this is the response from FBID', product)
			res.redirect('/products')
		})
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})
////////////////////////////////////////////
// Export the Router
////////////////////////////////////////////
module.exports = router