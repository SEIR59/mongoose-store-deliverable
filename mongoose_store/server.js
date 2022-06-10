const express = require('express')
const path = require('path')
const PORT = 3000
const middleware = require('./utils/middleware.js')
const ProductRouter = require('./controllers/product')
const Product = require('./models/product')

// Use liquid and direct to folder views for pages
const app = require("liquid-express-views")(express())


// Middleware 
middleware(app)


// Routes to product 
app.use('/products/', ProductRouter)



// Port to listen to
app.listen(PORT, () => {
    console.log(`on port ${PORT}`)
})