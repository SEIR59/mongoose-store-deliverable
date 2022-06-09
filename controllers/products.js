// import dependencies
const express = require("express")
const Product = require("../models/products.js")

// create route
const router = express.Router()

// index route
router.get("/", (request, response) => {
    response.send("eyo bonk.io?")
})

// export the router
module.exports = router