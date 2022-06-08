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
    res.render('products/index', { products });
  } catch (error) {
    res.send(error);
  }
});

// ! Show Route
Router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    console.log(product);
    res.render('products/show', { product });
  } catch (error) {
    res.send(error);
  }
});

// ! Delete Route
Router.delete('/:id', async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.redirect('/products')
  } catch (error) {
    res.send(error);
  }
});

module.exports = Router;
