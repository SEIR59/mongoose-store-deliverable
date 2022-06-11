require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const path = require("path")
const Router = require('./controllers/products')

const app = require("liquid-express-views")(express(), {
    root: [path.resolve(__dirname, "views/")],
  });

  //middleware
app.use(morgan("tiny")) 
app.use(methodOverride("_method")) 
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public")) 

app.use('/products', Router)

app.get("/", (req, res) => {
    res.send("Here");
  });

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port 3000`));