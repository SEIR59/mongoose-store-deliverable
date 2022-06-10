const mongoose = require('mongoose')

const mongoURI = 'mongodb://127.0.0.1/products'
const db = mongoose.connection

mongoose.connect(mongoURI)

db.on("open", () => console.log("Connected to Mongoose"))
db.on("close", () => console.log("Disconnected from Mongoose"))
db.on("error", (error) => console.log(error));

module.exports = mongoose