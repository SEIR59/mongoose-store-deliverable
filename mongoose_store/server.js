//* -------------------------------------------------------------------------- */
//*                           Import Our Dependencies                          */
//* -------------------------------------------------------------------------- */
require('dotenv').config(); // Load ENV Variables
const express = require('express'); // import express
const morgan = require('morgan'); //import morgan
const methodOverride = require('method-override');
const path = require('path');
const mongoose = require('./models/connection');
const productsRoute = require('./controllers/productsRoute');

//! Create our Express Application Object Bind Liquid Templating Engine
const app = require('liquid-express-views')(express(), {
  root: [path.resolve(__dirname, 'views/')],
});

//* -------------------------------------------------------------------------- */
//*                                 Middlewares                                */
//* -------------------------------------------------------------------------- */
app.use(morgan('dev')); //? logging
app.use(methodOverride('_method')); //? override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); //? parse urlencoded request bodies
app.use(express.static('public')); //? serve files from public statically

//* -------------------------------------------------------------------------- */
//*                                 Routes                                     */
//* -------------------------------------------------------------------------- */
app.use('/products', productsRoute);


app.get('/', (req, res) => {
  res.redirect('/products')
});

//* -------------------------------------------------------------------------- */
//*                               Server Listener                              */
//* -------------------------------------------------------------------------- */
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
