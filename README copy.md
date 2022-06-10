# Full Stack Products Build with Mongo and Express

### Part 1 - Setup, Index, Show, New, Create

## Setup

- create a new folder

- create a server.js `touch server.js`

- create a new npm project `npm init -y`

- install dependencies `npm install express mongoose method-override liquid-express-views dotenv morgan`

- install nodemon as a dev dependency `npm install --save-dev nodemon`

- setup the following scripts in package.json

```json
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
```

#### Summary of Dependencies

    - express => web framework for create server and writing routes

    - mongoose => ODM for connecting to and sending queries to a mongo database

    - method-override => allows us to swap the method of a request based on a URL query

    - liquidjs-express-views => the templating engine

    - dotenv => will allow us to use a `.env` file to define environmental variables we can access via the `process.env` object

    - morgan => logs details about requests to our server, mainly to help us debug

- create a `.env` file with the following dependencies

```
DATABASE_URL=<use your mongodb.com url>
PORT=4000
```

- create a `.gitignore` file with the following (always a good habit to make one even if you have a global .gitignore, the global is there to catch you in case)

```
/node_modules
.env
```

## Setting Up Our server.js

### Import our dependencies

```js
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path")
```

### Establish Database Connection

```js
/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG);

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));
```

### Create Our Products Model

```js
////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make products schema
const productsSchema = new Schema({
  name: String,
  color: String,
  readyToEat: Boolean,
});

// make product model
const Product = model("Product", productsSchema);
```

### Create App Object

```js
/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), {root: [path.resolve(__dirname, 'views/')]})
```
```

### Register our Middleware

```js
/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically
```

### Our initial route

```js
////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("your server is running... better catch it.");
});
```

### Server Listener

```js
//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
```

### The complete server.js file

```js
/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path")

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG);

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make products schema
const productsSchema = new Schema({
  name: String,
  color: String,
  readyToEat: Boolean,
});

// make product model
const Product = model("Product", productsSchema);

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), {root: [path.resolve(__dirname, 'views/')]})

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
app.get("/", (req, res) => {
  res.send("your server is running... better catch it.");
});

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
```

- run server `npm run dev`
- visit `localhost:4000` to see if our test route works

## Seeding Our Database

Before we build all our crud routes we should get some sample data in our database. There are two ways we can facilitate this:

- Seed Route: A route on our server when requested will delete everything in our database and re-seed it with some starter data
- Seed File: A script we can run (usually called seed.js) that'll empty and re-seed our database.

We'll create a seed route for now, later I'll also show you how to setup a seed file when we refactor the application later on.

Add This to your routes

```js
app.get("/products/seed", (req, res) => {
  // array of starter products
  const startProducts = [
    { name: "Orange", color: "orange", readyToEat: false },
    { name: "Grape", color: "purple", readyToEat: false },
    { name: "Banana", color: "orange", readyToEat: false },
    { name: "Strawberry", color: "red", readyToEat: false },
    { name: "Coconut", color: "brown", readyToEat: false },
  ];

  // Delete all products
  Product.deleteMany({}).then((data) => {
    // Seed Starter Products
    Product.create(startProducts).then((data) => {
      // send created products as response to confirm creation
      res.json(data);
    });
  });
});
```

now we can use the url `/products/seed` as a reset button on our data, great for development. Keep in mind you would want to comment this out in production so users can't reset your data by accident.

## Index Route (Get => /products)

Mongoose allows you to write your queries in three ways

- using a callback (what you've done so far)
- using .then
- using async await

So here is how the route would look like all three ways:

#### The .then Method

```js
// index route
app.get("/products", (req, res) => {
  // find all the products
  Product.find({})
    // render a template after they are found
    .then((products) => {
      res.render("products/index.liquid", { products });
    })
    // send error as json if they aren't
    .catch((error) => {
      res.json({ error });
    });
});
```

#### Callback Method

```js
// index route
app.get("/products", (req, res) => {
  Product.find({}, (err, products) => {
    res.render("products/index.liquid", { products });
  });
});
```

#### The Async/Await Method

```js
// index route
app.get("/products", async (req, res) => {
  const products = await Products.find({});
  res.render("products/index.liquid", { products });
});
```

## Setting Up Our Views

- create a views and public folder `mkdir views public`

- in the public folder let's make a css and javascript file `touch public/styles.css public/app.js`

- make a products folder in views `mkdir views/products`

- make a layout.liquid in your views folder `touch views/layout.liquid`

- in the layout.liquid file add the following

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Products Website</title>
    <!-- Milligram CSS for Some Default Styling -->
    <!-- Google Fonts -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic"
    />

    <!-- CSS Reset -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
    />

    <!-- Milligram CSS -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css"
    />

    <!-- Jquery -->
    <script
      src="https://code.jquery.com/jquery-3.6.0.min.js"
      integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
      crossorigin="anonymous"
    ></script>

    <!-- OUR CSS AND JS -->
    <link rel="stylesheet" href="/styles.css" />
    <script src="/app.js" defer></script>
  </head>
  <body>
    <header>
      <h1>The Products App</h1>
    </header>

    <main>{% block content %}My default content{% endblock %}</main>

    <footer></footer>
  </body>
</html>
```

then put the following in the views/products/index.liquid

```html
{% layout "layout.liquid" %} {% block content %}
<div>
  {% for product in products %}
  <article>
    <a href="/products/{{ product._id }}">
      <h2>
        {{product.name}} - {% if product.readyToEat == true %} Ripe {% else %} Not
        Ripe {% endif %}
      </h2>
    </a>
  </article>
  {% endfor %}
</div>
{% endblock %}
```

Now we can see the list of products and whether they are ripe or not, except they all have links that don't take us anywhere... because we still need to make the show route and view.

## The Show Route (GET => /products/:id)

Add the following route to server.js (remember, always keep the show route at the bottom to avoid route naming collisions)

```js
// show route
app.get("/products/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;

  // find the particular product from the database
  Product.findById(id)
    .then((product) => {
      // render the template with the data from the database
      res.render("products/show.liquid", { product });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
```

- now create `views/products/show.liquid`

```html
{% layout "layout.liquid" %} {% block content %}
      <div>
        <article>
          <h2>
            {{ product.name }} -
            
            {% if readyToEat == true %}
            Ready to Eat
            {% else %}
            Not Ready to Eat
            {% endif %}
          </h2>
          <h3>{{ product.color }}</h3>
          <a href="/products/{{ product._id }}/edit"><button>Edit</button></a>
          <form action="/products/{{ product._id }}?_method=DELETE" method="POST">
            <input type="submit" value="Delete" />
          </form>
          <a href="/products/"><button>Back to Main</button></a>
        </article>
      </div>
{% endblock %}
```

So now we can see an individual product, we have the delete and edit button setup for later. But before we set that up let's make sure we can create a product!

## New Route (GET => /products/new)

This route should render a form for the user to create a new product, let's add the route! (Remember it should be above your show route)

```js
// new route
app.get("/products/new", (req, res) => {
  res.render("products/new.liquid");
});
```

- let's create `views/products/new.liquid`

```html
{% layout "layout.liquid" %} {% block content %}
<div>
  <form action="/products" method="post">
    <fieldset>
      <legend>Create a New Product</legend>
      <label>
        NAME:<input type="text" name="name" placeholder="enter product name" />
      </label>
      <label>
        COLOR:<input type="text" name="color" placeholder="enter product name" />
      </label>
      <label> READY TO EAT:<input type="checkbox" name="readyToEat" /> </label>
    </fieldset>
    <input type="submit" value="create new product" />
  </form>
</div>
{% endblock %}
```

- let's add a link to this page in products/index.liquid

```html
{% layout "layout.liquid" %} {% block content %}
<div>
  <a href="/products/new"><button>Create A New Product</button></a>
  {% for product in products %}
  <article>
    <a href="/products/{{ product._id }}">
      <h2>
        {{product.name}} - {% if product.readyToEat == true %} Ripe {% else %} Not
        Ripe {% endif %}
      </h2>
    </a>
  </article>
  {% endfor %}
</div>
{% endblock %}
```

Form looks good but it has no create route to submit the forms data too! Let's take care of that!

## Create Route (POST => /products)

- let's add the route (location for this route doesn't particularly matter, but your always safe with INDUCES)

```js
// create route
app.post("/products", (req, res) => {
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
  // create the new product
  Product.create(req.body)
    .then((products) => {
      // redirect user to index page if successfully created item
      res.redirect("/products");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
```

Now you should be able to add products!

## Edit Route (GET => /products/:id/edit)

This route should produce a form to edit the product with the specified id. Let's make the route, make sure it's above the show route.

```js
// edit route
app.get("/products/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the product from the database
  Product.findById(id)
    .then((product) => {
      // render edit page and send product data
      res.render("products/edit.liquid", { product });
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
```

- let's make a copy of `views/products/new.liquid` and call it `views/products/edit.liquid` and refactor it so the form shows the current values of the product!

```html
{% layout "layout.liquid" %} {% block content %}
<div>
  <form action="/products/{{product._id}}?_method=PUT" method="post">
    <fieldset>
      <legend>Edit {{product.name}}</legend>
      <label>
        NAME:<input
          type="text"
          name="name"
          placeholder="enter product name"
          value="{{product.name}}"
        />
      </label>
      <label>
        COLOR:<input
          type="text"
          name="color"
          placeholder="enter product name"
          value="{{product.color}}"
        />
      </label>
      <label>
        READY TO EAT:<input type="checkbox" name="readyToEat" {% if
        product.readyToEat == true %} checked {% endif %} />
      </label>
    </fieldset>
    <input type="submit" value="Edit {{product.name}}" />
  </form>
</div>
{% endblock %}
```

Now that edit button we made earlier should take us to the form successfully, but the form doesn't do anything when submitted. That's because we still need to make the update route!

## Update Route (PUT => /products/:id)

Let's add the route

```js
//update route
app.put("/products/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
  // update the product
  Product.findByIdAndUpdate(id, req.body, { new: true })
    .then((product) => {
      // redirect to main page after updating
      res.redirect("/products");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
```

Now you can edit products

## Destroy (Delete => /products/:id)

This last route will allow our delete button to work giving us full CRUD functionality!

```js
app.delete("/products/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the product
  Product.findByIdAndRemove(id)
    .then((product) => {
      // redirect to main page after deleting
      res.redirect("/products");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
```

Success, you now have full crud functionality!

[The final code can be seen here](https://git.generalassemb.ly/sei-ec-remote/full-CRUD-products-mongoose/tree/refactor1)
