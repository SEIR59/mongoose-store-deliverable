const express = require("express")
const Product = require("../models/product")

const router = express.Router()

router.use((req, res, next) => {
    res.send('Connected')
  });

module.exports = router