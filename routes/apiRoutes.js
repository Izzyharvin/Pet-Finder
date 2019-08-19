/* eslint camelcase: "off" */
var db = require("../models");
var axios = require("axios");
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
  app.get("/api/petfinder", function(req, res) {
    var options = {
      method: "POST",
      data: {
        grant_type: "client_credentials",
        client_id: process.env.api_key,
        client_secret: process.env.api_secret
      },
      url: "https://api.petfinder.com/v2/oauth2/token"
    };
    axios(options)
      .then(function(token) {
        petCall(token.data.access_token);
      })
      .catch(function(err) {
        console.log(err);
      });
    function petCall(bearer) {
      var config = {
        headers: { Authorization: "Bearer " + bearer }
      };
      axios
        .get("https://api.petfinder.com/v2/animals?type=dog&page=2", config)
        .then(function(pets) {
          res.json(pets.data);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  });
};
