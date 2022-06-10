/*========================================
        Import Dependencies
========================================*/
const express = require("express")
const Product = require("../models/product.js")

/*========================================
        Create Route
========================================*/
const router = express.Router()
/*========================================
        Router Middleware
========================================*/
// Authorization Middleware
// router.use((req, res, next) => {
//     if (req.session.loggedIn) {
//       next();
//     } else {
//       res.redirect("/users/login");
//     }
//   });

/*========================================
        Routes
========================================*/
// I-N-D-U-C-E-S
// index route
router.get("/", (req, res) => {
    // res.send("This is the /products route\nThis will show all of the products")
    // Run query to get all items.
    Product.find({})
    // .THEN render the page with the database data.
    .then((products) => {
        res.render("products/index", { products })
    })
    // if there is an error, catch it and send it as a console.log() and res with the error in json format.
    .catch((error) => {
        console.log(error)
        res.json({error})
    })
})

// new route
router.get("/new", (req, res) => {
    // res.send("This is the /products/new route\nThis will go to a form to add a new item to inventory.")
    res.render("products/new")
})

// delete route
router.delete("/:id", (req, res) => {
    // res.send("This is the delete route for /products route, this will delete a selected entry then reroute to the main page /products")
    const idProduct = req.params.id;
    Product.findByIdAndRemove(idProduct)
      .then((product) => {
        // redirect to main page after deleting
        res.redirect("/products");
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
})

// update route
router.put("/:id", (req, res) => {
    // res.send("This is the UPDATE route for /products/:id route\nThis will add the updated information to the database then render the page")
    let idProduct = req.params.id
    req.body.price = (req.body.price*100)
    let pageData = req.body
    console.log(pageData)
    
    Product.findByIdAndUpdate(idProduct, req.body, {new: true})
    .then((product) => {
        res.redirect(`/products/${product.id}`)
    })
    .catch((error) => {
        console.log(error);
        res.json({ error });
      });
})

// create route
router.post("/", (req,res) => {
    // create new fruit
    req.body.price = (req.body.price*100)
    Product.create(req.body)
    .then((product) => {
        res.redirect("/products")
    })
    .catch((error) => {
        console.log(error);
        res.json({ error });
      });
})
// buy route Method - PUT
router.put("/:id/buy", (req,res) => {
    // update qty of item and redirect back to item page
    let indProduct = req.params.id
    let pageData = req.body
    console.log(pageData)
    Product.findById(indProduct)
    .then((product) => {
        console.log(product)
        product.qtyAvailable = (product.qtyAvailable - 1) 
        Product.findByIdAndUpdate(product.id, product, { new: true })
        .then((product) => {
            console.log(product)
            res.redirect(`/products/${product.id}`)
        })
        .catch((error) => {
            console.log(error)
            res.json({ error })
        })
    })
    .catch((error) => {
        console.log(error)
        res.json({ error })
    })
})

// edit route
router.get("/:id/edit", (req, res) => {
    // res.send("This is the /products:id/edit route\nThis will allow you to edit a selected item.")
    let idProduct = req.params.id
    Product.findById(idProduct)
    .then((product) => {
        product.price = (product.price/100).toFixed(2)
        res.render("products/edit", {product})
    })
    .catch((error) => {
        console.log(erroe)
        res.json({error})
    })

})

// show route
router.get("/:id", (req, res) => {
    // res.send("This is the /products/:id route\nThis will show you more details on a selected iten and allow you to purchase it.")
    let idProduct = req.params.id
    Product.findById(idProduct)
    .then((product) => {
        product.price = (product.price/100).toFixed(2)
        res.render("products/show", {product})
    })
    .catch((error) => {
        console.log(error)
        res.json((error))
    })
})


/*========================================
        Export the Router
========================================*/
module.exports = router