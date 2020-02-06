var db = require("../models");

console.log(db.User);

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.User.findAll({}).then(function(eMatch) {
      res.json(eMatch);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.User.create(req.body).then(function(eMatch) {
      res.json(eMatch);
    });
  });
  
  app.post("/api/search", function(req, res) {
    db.User.update(req.body).then(function(eMatch) {
      res.json(eMatch);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
