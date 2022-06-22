const express = require('express')
const Product = require('../models/product')

const router = express.Router()

// Index Page
router.get('/', async (req, res) => {
    const products = await Product.find({})
	res.render('index.liquid', {
        products
    })
})

// Create Page
router.post('/', (req, res) => {
	Product.create(req.body)
		.then((products) => {
			res.redirect('/products')
		})
		// send error as json
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

// Seed
router.get('/seed', async (req, res) => {
	const newProducts = [
		{
			name: 'Beans',
			description:
				'A small pile of beans. Buy more beans for a big pile of beans.',
			img: 'https://imgur.com/LEHS8h3.png',
			price: 5,
			qty: 99,
		},
		{
			name: 'Bones',
			description: "It's just a bag of bones.",
			img: 'https://imgur.com/dalOqwk.png',
			price: 25,
			qty: 0,
		},
		{
			name: 'Bins',
			description: 'A stack of colorful bins for your beans and bones.',
			img: 'https://imgur.com/ptWDPO1.png',
			price: 7000,
			qty: 1,
		},
	]

	try {
		const seedItems = await Product.create(newProducts)
		res.send(seedItems)
	} catch (err) {
		res.send(err.message)
	}
})

// New Page
router.get('/new', (req, res) => {
	res.render('new.liquid')
})

// Edit Page
router.get('/:id/edit', (req, res) => {
	// get the id from params
	const id = req.params.id
	// get the product from the database
	Product.findById(id)
		.then((product) => {
			// render edit page and send product data
			res.render('edit.liquid', { product })
		})
		// send error as json
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

// Show Page
router.get('/:id', (req, res) => {
	const id = req.params.id

	// find the particular product from the database
	Product.findById(id)
		.then((product) => {
			// render the template with the data from the database
			res.render('show.liquid', { product })
		})
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

router.put('/:id/buy', (req, res) => {
    Product.updateOne({ _id: req.params.id }, { $inc: { qty: -1 } })
		.then((product) => res.redirect(`/products/${req.params.id}`))
		.catch((error) => console.log(error))
})

// Update Route
router.put('/:id', (req, res) => {
	// get the id from params
	const id = req.params.id
	// update the product
	Product.findByIdAndUpdate(id, req.body, { new: true })
		.then((product) => {
			// redirect to main page after updating
			res.redirect('/products')
		})
		// send error as json
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

// Delete Page
router.delete('/:id', (req, res) => {
	// get the id from params
	const id = req.params.id
	// delete the product
	Product.findByIdAndRemove(id)
		.then((product) => {
			// redirect to main page after deleting
			res.redirect('/products')
		})
		// send error as json
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

module.exports = router
