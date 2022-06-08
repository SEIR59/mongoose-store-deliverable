//* -------------------------------------------------------------------------- */
//*                             Import Dependencies                            */
//* -------------------------------------------------------------------------- */
const express = require('express');
const Product = require('../models/productsModel');
const Router = express.Router();


// ! Index Route
Router.get('/', (req, res) => {
  res.render('products/index');
});

module.exports = Router;
