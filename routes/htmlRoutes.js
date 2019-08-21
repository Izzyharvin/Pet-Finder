module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/dog", function(req, res) {
    res.render("dog");
  });

  app.get("/cat", function(req, res) {
    res.render("cat");
  });
  app.get("/example", function(req, res) {
    var passedVariable = req.query.valid;
    console.log(passedVariable);
    res.render("example", passedVariable);
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
