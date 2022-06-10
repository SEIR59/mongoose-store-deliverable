const mongoose = require('./connection')
const Product = require('./product')

const db = mongoose.connection

db.on('open', () => {
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

    // 1. Delete all the data that already exists (will only happen if data exists)
    Product.remove({})
        .then((deletedProducts) => {
            console.log(deletedProducts)
            Product.create(newProducts)
                .then(data => {
                    console.log(data)
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            db.close()
        })
})



