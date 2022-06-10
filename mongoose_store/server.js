/*========================================
        Require Dependencies
========================================*/
require("dotenv").config()
const express = require("express")
const methodOverride = require("method-override")
const path = require("path")
// const req = require("express/lib/request")
const ProductRouter = require("./controllers/product.js")
/*========================================
        These will be for tracking session and user.
const session = require("express-session") 
const MongoStore = require("connect-mongo")
========================================*/

/*========================================
        Create Express Application Object 
        &&
        Bind Liquid Templating Engine
        ∆NOTE: I'm not exactly sure why we set the options for express().
========================================*/
const app = require("liquid-express-views")(express(), { root: [path.resolve(__dirname, "views/")] })

/*========================================
        Middleware
========================================*/
app.use(methodOverride("_method")) // Override method PUT and DELETE request on forms
app.use(express.urlencoded({ extended: true })) // Allows access to the data in a form within the body of a requested page.
app.use(express.static("public")) // Search files form public folder staticly
/*========================================
        Required for keeping track of sessions for users. 
        I will add this once I need it.

    app.use(session({
            secret: process.env.SECRET,
            store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
            saveUninitialized: true,
            resave: false
        }))
    ========================================*/
/*========================================
        Routes
========================================*/
app.use("/products", ProductRouter)

app.get("/", (req, res) => {
    res.send("You've reached the '/' route of the server.")
})
/*========================================
        Server Listener
========================================*/
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})

/*========================================
        QUESTIONS:

        1.
========================================*/
