///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("./connections")


///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// save the connection in a variable
const db = mongoose.connection;

// Make sure code is not run till connected
db.on("open", () => {

})

app.get('/seed', async (req, res) => {
    const newProducts =
      [
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
  
    try {
      const seedItems = await Product.create(newProducts)
      res.send(seedItems)
    } catch (err) {
      res.send(err.message)
    }
  })

     // Delete all products
     Store.deleteMany({})
     .then((deletedStore) => {
       // add the starter product
       Store.create(newProducts)
         .then((newProducts) => {
           // log the new product to confirm their creation
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
     })
   