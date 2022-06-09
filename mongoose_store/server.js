const express = require('express')
const path = require('path')
const PORT = 3000
const middleware = require('./utils/middleware')
const ProductRouter = require('./controllers/product')

// Use liquid and direct to folder views for pages
const app = require("liquid-express-views")(express(), {root: [path.resolve(__dirname, 'views/')]})


// Middleware 
middleware(app)


// Routes to product 
app.use('/products/', ProductRouter)



// Port to listen to
app.listen(PORT, () => {
    console.log(`on port ${PORT}`)
})