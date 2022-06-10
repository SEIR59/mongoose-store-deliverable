/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const express = require("express");
const Product = require('../models/product.js')

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////
  
  // index route
//   async: dont run, i have to wait for find finish, before i run
//   router.get("/", async (req, res) => {
//       console.log('huh')
//       const products = await Product.find({});
//     res.render("products/index.liquid", {
//       products
//     });
//   });

//this worked
// router.get('/', (req, res) => {
//     res.send('say something')
// })

// index route
router.get('/', (req, res) => {
    Product.find({})
    .then((products) => {
        // res.send(products)
        res.render('./products/index.liquid', {products})

    })
    .catch((error) => {
      console.log(error)
      res.json({error})
    })
})

// create route
router.post("/", (req, res) => {
  Product.create(req.body)
    .then((products) => {
      res.redirect("/products");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// new route
router.get("/new", (req, res) => {
  res.render("./products/new.liquid");
});

// show route
router.get('/:id', (req, res) => {
  const id = req.params.id

  Product.findById(id)
  .then((product) => {
    res.render(
      './products/show',
      {product}
    )
  })
  .catch((error) => {
    console.log(error)
    res.json({error})
  })
})

 // edit route
 router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  
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

//update route
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  Product.findByIdAndUpdate(id, req.body, { new: true })
    .then((product) => {
      // redirect to main page after updating
      res.redirect(`/products/${id}`);
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// Put method for buy route
router.put('/:id/buy', (req, res) => {
  const id = req.params.id
  Product.findById(id)
  .then((product) => {
    // console.log(product)
    product.qty = (product.qty -1)
    Product.findByIdAndUpdate(product.id, product, {new: true})
    .then((product) => {
      // console.log(product)
      res.redirect(`/products/${product.id}`)
    })
    .catch((error) => {
      console.log(error)
      res.json(error)
    })
  })
  .catch((error) => {
    console.log(error)
    res.json(error)
  })
})

// delete route
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Product.findByIdAndRemove(id)
  .then((product) => {
    res.redirect('/products') // '/' -> to '/products' only works when router called
  })
  .catch((error) => {
    console.log(error)
    res.json({error})
  })
})

// routesReport.print(router)


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router