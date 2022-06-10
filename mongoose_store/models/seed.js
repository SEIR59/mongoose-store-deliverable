/*========================================
    Import Dependencies
========================================*/
const mongoose = require("./connection.js")
const Product = require("./product.js")
/*========================================
    Seed Code
========================================*/
// save connection in variable because we will be using a couple times.
const db = mongoose.connection

// make sure code only runs when db is connected
db.on("open", () => {
    // array of starter products
    const starterProducts = [
        {
            name: "Chedder Cheese",
            description: "You can't go wrong with a good block of Chedder Cheese.",
            img:"https://cdn.cnn.com/cnnnext/dam/assets/200623110902-cheddar-cubes-full-169.jpg",
            price: 2800,
            qtyAvailable: 17,
        },
        {
            name: "Swiss Cheese",
            description: "A wonderful block of swiss cheese, good for any occasion.",
            img:"https://images.theconversation.com/files/316919/original/file-20200224-24701-1lk36vg.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
            price: 5400,
            qtyAvailable: 14,
        },
        {
            name:"Pepper Jack Cheese",
            description: "If you like a little spice, this is the cheese for you.",
            img:"https://colosse.com/wp-content/uploads/2016/03/jack-cheese-stock.jpg",
            price:3200,
            qtyAvailable: 4,
        },
        {
            name: "Goat Cheese",
            description: "If you are feeling a bit fancier try this one out.",
            img: "https://www.zingermanscreamery.com/app/uploads/2018/04/zing-creamery-375.jpg",
            price: 4200,
            qtyAvailable: 3,
        },
    ]

    // Delete all data in collection
    Product.deleteMany({})
    .then((deletedProducts) => {
        // add starterProducts
        Product.create(starterProducts)
        .then((addedProducts) => {
            // log added products to see if they were created correctly.
            console.log(addedProducts)
            db.close()
        })
    })
    .catch((error) => {
        console.log(error)
        db.close()
    })
})