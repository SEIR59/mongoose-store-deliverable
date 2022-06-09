/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const mongoose = require("./connections.js");
const Product = require("../models/product.js");

///////////////////////////////////////////
///// Seed Code
//////////////////////////////////////////

//SAVE THE CONNECTION IN A VARIABLE
const db = mongoose.connection;

//Make sure code is not run till connected
db.on("open", () => {

  ///////////////////////////////////
  //   seed code
  ///////////////////////////////////
    const newProducts = [
      {
        name: "Beans",
        description:
          "A small pile of beans. Buy more beans for a big pile of beans.",
        img: "https://imgur.com/LEHS8h3.png",
        price: 5,
        qty: 99,
      },
      {
        name: "Bones",
        description: "It's just a bag of bones.",
        img: "https://imgur.com/dalOqwk.png",
        price: 25,
        qty: 0,
      },
      {
        name: "Bins",
        description: "A stack of colorful bins for your beans and bones.",
        img: "https://imgur.com/ptWDPO1.png",
        price: 7000,
        qty: 1,
      },
    ];
    
    //Delete all Products
    Product.deleteMany({})
        .then((deletedProducts) =>{
            //add the starter products
            Product.create(newProducts)
            .then((newProducts) =>{
                //log the new products to confirm their creation
                console.log(newProducts)
                db.close()
            })
            .catch((error) =>{
                console.log(error)
                db.close()
            })
        })
        .catch((error) =>{
            console.log(error);
            db.close();
        })
  });

