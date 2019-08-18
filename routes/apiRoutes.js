var db = require("../models");

module.exports = function(app) {
  // Get all customers
  app.get("/api/customers", function(req, res) {
    db.Customers.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // Create a new customers
  app.post("/api/customers", function(req, res) {
    db.Customers.create({
      name: req.body.name,
      email: req.body.email,
      number: req.body.number
    }).then(function(results) {
      res.json(results);
    });
  });
};
