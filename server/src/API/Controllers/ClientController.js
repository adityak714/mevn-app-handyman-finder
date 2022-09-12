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

//Get all clients
router.get('/api/clients', function (req, res, next) {
  Client.find({}, function(err, clients) {
    if (err) {res.send(err);}
    res.status(200).json({"clients": clients});
  })
});

//Get a specific client
router.get('/api/clients/:id', function (req, res, next) {
  Client.findById(req.params.id)
    .then((clientFound) => {
      if (clientFound) {
        res.status(200).json(clientFound);
      }})
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
