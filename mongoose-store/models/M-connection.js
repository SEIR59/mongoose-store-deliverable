const mongoose = require('mongoose')
const DATABASE_URL = 'mongodb://127.0.0.1/mongoose-store'
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const db = mongoose.connection

mongoose.connect(DATABASE_URL, CONFIG)
db.on('open', () => { console.log('Connected to DB') })
    .on('close', () => { console.log('Closing DB') })
    .on('error', (error) => { console.log('There was an error: ', error) 
})

module.exports = mongoose