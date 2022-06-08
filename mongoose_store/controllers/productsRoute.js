//* -------------------------------------------------------------------------- */
//*                             Import Dependencies                            */
//* -------------------------------------------------------------------------- */
const express = require('express');
const Product = require('../models/productsModel');
const Router = express.Router();

// ! Index Route
Router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.render('products/index', {products});
  } catch (error) {
    res.send(error);
  }
});

module.exports = Router;
