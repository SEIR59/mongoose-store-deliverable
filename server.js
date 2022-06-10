require("dotenv").config();
const express = require("express"); 
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override")
const path = require("path");
const Product = require("./models/products");
const ProductRouter = require('./controllers/products')


const app = require("liquid-express-views")(express(), {
  root: [path.resolve(__dirname, "views/")],
});

app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(
  express.urlencoded({
    extended: true,
  })
); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

app.use('/products', ProductRouter)

app.get("/", (req, res) => {
    res.send("your server is running... better catch it.");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
