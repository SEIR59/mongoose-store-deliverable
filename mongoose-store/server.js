//variable initialization
const express = require('express')
const app = require('liquid-express-views')(express())
const storeRouter = require('./controllers/C-store')
const methodOverride = require('method-override')

//middleware

app.use(methodOverride("_method")) //override method for put and delete
app.use(express.urlencoded({ extended: true })) //for req.body contents to be passed on
app.use(express.static("/public")) //serves up static files, like .js or .css from a folder named public

//routing protocols
app.use('/store', storeRouter)

app.get('/', (req,res)=>{
    res.send('hi')
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


//server
app.listen(4000,()=>{
    console.log('Server swimming.')
})