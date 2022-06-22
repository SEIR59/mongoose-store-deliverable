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

})

// Edit Page
router.get('/:id/edit', (req, res) => {

})

// Show Page
router.get('/:id', (req, res) => {

})

router.put('/:id/buy', (req, res) => {

})

// Update Route
router.put('/:id', (req, res) => {

})

// Delete Page
router.get('/:id', (req, res) => {

})

module.exports = router
