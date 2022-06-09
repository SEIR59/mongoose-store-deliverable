const express = require('express')
const path = require('path')
const PORT = 3000
const ProductRouter = require('./controllers/product')
const app = require("liquid-express-views")(express(), {root: [path.resolve(__dirname, 'views/')]})



// Routes to product 
app.use('/products/', ProductRouter)

app.listen(PORT, () => {
    console.log(`on port ${PORT}`)
})