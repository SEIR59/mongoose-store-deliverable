//////////////////////////////////////
// Import Dependencies
//////////////////////////////////////
const express = require("express");

//Index Route
router.get("/", async (req, res) => {
    const stores = await Store.find({});
    res.render("views/index.liquid", {  });
  });
  
  //New Route
  router.get("/new", (req, res) => {
    res.render("views/new.liquid");
  });
  
  // create route
  router.post("/", (req, res) => {
    // check if the readyToEat property should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
    // add username to req.body to track related user
    req.body.username = req.session.username;
    // create the new fruit
    Store.create(req.body)
      .then((fruits) => {
        // redirect user to index page if successfully created item
        res.redirect("/view");
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });
  
  // edit route
  router.get("/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // get the fruit from the database
    Store.findById(id)
      .then((fruit) => {
        // render edit page and send fruit data
        res.render("views/edit.liquid", { fruit });
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });
  
  router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // delete the fruit
    Store.findByIdAndRemove(id)
      .then((fruit) => {
        // redirect to main page after deleting
        res.redirect("/store");
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });
  
  //update route
  router.put("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // check if the readyToEat property should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
    // update the fruit
    Store.findByIdAndUpdate(id, req.body, { new: true })
      .then((store) => {
        // redirect to main page after updating
        res.redirect("/store");
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });
  
  // show route
  router.get("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
  
    // find the particular fruit from the database
    Store.findById(id)
      .then((stores) => {
        // render the template with the data from the database
        res.render("views/show.liquid", { store });
      })
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });
  
  //////////////////////////////////////////
  // Export the Router
  //////////////////////////////////////////
  module.exports = router;
  