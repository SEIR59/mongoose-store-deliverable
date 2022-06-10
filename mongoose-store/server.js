//variable initialization
const express = require('express')
const app = require('liquid-express-views')(express())
const router = express.Router()
const storeRouter = require('./controllers/C-store.js')

//middleware

app.use(methodOverride("_method")) //override method for put and delete
app.use(express.urlencoded({ extended: true })) //for req.body contents to be passed on
app.use(express.static("public")) //serves up static files, like .js or .css from a folder named public

//routing protocols

router.get('/store', storeRouter)


//server
app.list(3000,()=>{
    console.log('Server swimming.')
})