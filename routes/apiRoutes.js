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

  app.put("/api/userUpdate", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.User.update({
      text: req.body.text,
      complete: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbTodo) {
      res.render(dbUser);
    });
  });



  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
