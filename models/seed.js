///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("./connection");
const Product = require("./product");


///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

//save the connection in a variable
const db = mongoose.connection

// Make sure code is not run till connected

db.on("open", () => {
    //seed code below
    const startProducts = [
        {
            name: 'Coke',
            description: '12oz can of Coca Cola',
            img: 'https://media.istockphoto.com/photos/coke-picture-id458464735?k=20&m=458464735&s=612x612&w=0&h=CW8rzEiIMvuO23X9I3b6U_g2aBUQSZnWYLjWauLMxtg=',
            price: 1.25,
            qty: 12
        },
        {
            name: 'Pepsi',
            description: '12oz can of Pepsi',
            img: 'https://i5.walmartimages.com/asr/3bcc0155-c9d4-420d-a72d-b51df2f74272.b6728445b72558acb521af846c99591b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
            price: 1.50,
            qty: 20
        },
        {
            name: 'Sprite',
            description: '12oz can of Sprite',
            img: 'https://i5.walmartimages.com/asr/daa7d872-178d-4cfb-a90f-62bb7ffc58ff.9153c6dc42b8d21a586ae13261e2db9d.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
            price: 1.50,
            qty: 6
        }
    ];
    // Delete all fruits
    Product.deleteMany({})
        .then((data) => {
            // Seed Starter Fruits
            Product.create(startProducts)
                .then((products) => {
                    // send created fruits as response to confirm creation
                    console.log(products)
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            db.close()
    })
    });