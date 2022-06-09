// importing dependencies 
require("dotenv").config()
const express = require('express')
const methodOverride = require("method-override")
const path = require("path")

// establishing connection to our database
const mongoose = require("./models/connections.js")

// creating our app object
const app = require("liquid-express-views")(express(), { root: [path.resolve(__dirname, 'views/')] })

// middleware
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

// routes 
app.get("/", (req, res) => {
    res.send("route is working")
})

// server listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))