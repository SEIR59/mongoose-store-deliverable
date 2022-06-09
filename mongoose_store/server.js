const express = require('express')
const path = require('path')
const PORT = 3000
const app = require("liquid-express-views")(express(), {root: [path.resolve(__dirname, 'views/')]})

const Product = require('./models/product') 



app.listen(PORT, () => {
    console.log(`on port ${PORT}`)
})