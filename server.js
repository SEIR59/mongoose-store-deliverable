require('dotenv').config()
const express = require('express')
const app = require("liquid-express-views")(express(), { root: [path.resolve(__dirname, 'views/')] })
const methodOverride = require('method-override')
const path = require(path)
const mongoose = require('./models/connection')
const ProductRouter = require('./controllers/product')

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use('/product', ProductRouter)

app.get('/', (req, res) => {
    res.render('index.Liquid')
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`))