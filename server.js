// Import dependencies
const express = require("express"); // import express
const methodOverride = require("method-override");
const path = require("path")
const ProductsRouter = require("./controllers/products");
const MongoStore = require("connect-mongo");

const app = require('liquid-express-views')(express())



// MIDDLEWARE
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically



// ROUTES
app.use('/products', ProductsRouter)

app.get('/', (req, res) => {
    res.render('index.liquid')
})








// Listen Route
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
