require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
//Morgan for debugging
const morgan = require('morgan')
const path = require('path')
const ProductRouter = require('./controllers/products')


/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), { root: [path.resolve(__dirname, 'views/')] })


/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.use('/products', ProductRouter)

app.get('/', (req, res) => {
    res.send("Store Homepage")
})
 

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))