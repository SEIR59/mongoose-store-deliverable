const mongoose = require('./connection')
const Product = require('./product')
///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////
const db = mongoose.connection

// make sure code is not run until connected
db.on('open', () => {
    // array of starter products
    const startProducts = [
        {
            name: 'Beans',
            description: 'A small pile of beans. Buy more beans for a big pile of beans.',
            img: 'https://imgur.com/LEHS8h3.png',
            price: 5,
            qty: 99
          }, {
            name: 'Bones',
            description: 'It\'s just a bag of bones.',
            img: 'https://imgur.com/dalOqwk.png',
            price: 25,
            qty: 0
          }, {
            name: 'Bins',
            description: 'A stack of colorful bins for your beans and bones.',
            img: 'https://imgur.com/ptWDPO1.png',
            price: 7000,
            qty: 1
          }
    ]
    // Delete all products
    Product.deleteMany({})
    .then((deletedProducts) => {
      // add the starter fruits
      Product.create(startProducts)
        .then((newProducts) => {
          // log the new fruits to confirm their creation
          console.log(newProducts);
          db.close();
        })
        .catch((error) => {
          console.log(error);
          db.close();
        });
    })
    .catch((error) => {
      console.log(error);
      db.close();
    });
  ///////////////////////////////////////////////
// Write your Seed Code Above
//////////////////////////////////////////////
})