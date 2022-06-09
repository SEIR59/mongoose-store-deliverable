/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
// const mongoose = require("mongoose"); // don't need it here since in products model. keeping incase of issue
const path = require("path")

const ProductRouter = require("./controllers/products.js")
const UserRouter = require("./controllers/users.js")
// const session = require("express-session") // for authorization
// const MongoStore = require("connect-mongo"); //what connects to the mongo database

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
//didn't include app at the top since it's only used here
const app = require("liquid-express-views")(express(), {
  root: [path.resolve(__dirname, "views/")],
});

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically


////////////////////////////////////////////
// Routes (Root Route)
////////////////////////////////////////////
app.use("/products", ProductRouter); //now has access to all routes in fruits.js and will put the /fruit in front of every route created within that router

app.use("/users", UserRouter); // send all "/user" routes to user router


// app.get("/", (req, res) => { //leave this one in server!!!
//   res.send(`your server is running... you better catch it.`);
// });
app.get("/", (req, res) => {
  res.render("index.liquid");
});




//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT; // variable port that I'm pulling from the .env - this way you don't have to call it everytime you want to use it
app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
