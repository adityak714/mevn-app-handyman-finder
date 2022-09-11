var express = require("express");
var router = express.Router();
var Client = require("../../Infrastructure/models/ClientSchema");

//Sign up client
router.post("/api/clients", function (req, res, next) {
  var client = new Client(req.body);
  client.save(function (err, client) {
    if (err) {
      res.send(err);
    }
    res.status(201).json(client);
  });
});

module.exports = router;
