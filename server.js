//* -------------------------------------------------------------------------- */
//*                           Import Our Dependencies                          */
//* -------------------------------------------------------------------------- */
require('dotenv').config(); // Load ENV Variables
const express = require('express'); // import express
const morgan = require('morgan'); //import morgan
const methodOverride = require('method-override');
const path = require('path');

//! Create our Express Application Object Bind Liquid Templating Engine
const app = require('liquid-express-views')(express(), {
  root: [path.resolve(__dirname, 'views/')],
});

app.get('/', (req, res) => {
    res.send('Hello, World!')
})

//* -------------------------------------------------------------------------- */
//*                               Server Listener                              */
//* -------------------------------------------------------------------------- */
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
