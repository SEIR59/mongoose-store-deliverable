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
    res.render('products/index', { products, length: products.length });
  } catch (error) {
    res.send(error);
  }
});

// ! New Route
Router.get('/new', async (req, res) => {
  res.render('products/new');
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

// ! Create Route
Router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    console.log(product);
    res.redirect('/products');
  } catch (error) {
    res.send(error);
  }
});

// ! Edit Route
Router.get('/edit/:id', async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    console.log(product);
    res.render('products/edit', { product });
  } catch (error) {
    res.send(error);
  }
});

// ! Update Route
Router.put('/:id', async (req, res) => {
  const { name, description, price, qty, img } = req.body;
  try {
    await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        name,
        description,
        price,
        qty,
        img,
      }
    );
    res.redirect(`/products/${req.params.id}`);
  } catch (error) {
    res.send(error);
  }
});

// ! Buy Route
Router.put('/buy/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    const { qty } = product;
    try {
      await Product.findByIdAndUpdate({ _id: id }, { qty: qty - 1 });
    } catch (error) {
      res.send(error);
    }
    res.redirect(`/products/${id}`);
  } catch (error) {
    res.send(error);
  }
});

// ! Delete Route
Router.delete('/:id', async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.redirect('/products');
  } catch (error) {
    res.send(error);
  }
});

module.exports = Router;
