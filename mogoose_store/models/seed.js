///////////////////////////////////////////
// Import Dependencies
///////////////////////////////////////////
const mongoose = require("./connection.js");
const Product = require("./product.js"); // schema model

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// save the connection in a variable
const db = mongoose.connection;

// run the code once connected
db.on("open", () => {
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

  // delete all products
  Product.deleteMany({})
    .then(() => {
      Product.create(newProducts)
        .then(() => {
          console.log(newProducts);
          db.close();
        })
        .catch((err) => {
          console.log(err.message);
          db.close();
        });
    })
    .catch((err) => {
      console.log(err.message);
      db.close();
    });
});
