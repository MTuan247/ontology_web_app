module.exports = app => {
  const phones = require("../controllers/phone.controller.js");

  var router = require("express").Router();

  // Create a new phone
  router.post("/", phones.create.bind(phones));

  // Retrieve all phones
  router.get("/", phones.findAll.bind(phones));

  // Retrieve a single phone with id
  router.get("/:id", phones.findOne.bind(phones));

  // Update a phone with id
  router.put("/", phones.update.bind(phones));

  // Delete a phone with id
  router.post("/delete", phones.delete.bind(phones));

  app.use('/api/phones', router);
};