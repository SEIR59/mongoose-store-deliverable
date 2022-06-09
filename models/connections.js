// import dependencies
require("dotenv").config()
const mongoose = require("mongoose")

// setting up inputs
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// establish connection with the dtabase
mongoose.connect(DATABASE_URL, CONFIG)

// feedback for open/disconnect/error events
mongoose.connection
    .on("open", () => console.log("Connected to Mongoose"))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.log(error))

// exporting connection
module.exports = mongoose