// import dependencies
// this allows us to load our env variables
require('dotenv').config()
const express = require('express')
//Our routers
const FruitRouter = require('./controllers/fruit')
const UserRouter = require('./controllers/user')
const HomeRouter = require('./controllers/home')
const middleware = require('./utils/middleware')

// Create our express application object
const app = require('liquid-express-views')(express())

// Middleware
middleware(app)

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// send all '/fruits' routes to the Fruit Router
app.use('/fruits', FruitRouter)
app.use('/user', UserRouter)
app.use('/', HomeRouter)

// Server Listener
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`)
})