const express = require('express')
const Product = require('../models/product')

const router = express.Router()

// Index Page
router.get('/', (req, res) => {

	
})

// Create Page
router.post('/', (req, res) => {

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
