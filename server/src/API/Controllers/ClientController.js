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
router.get("/api/clients", function (req, res, next) {
  Client.find({}, function (err, clients) {
    if (err) {
      res.send(err);
    }
    res.status(200).json({ clients: clients });
  });
});

//Get a specific client
router.get("/api/clients/:id", function (req, res, next) {
  Client.findById(req.params.id)
    .then((clientFound) => {
      if (clientFound) {
        res.status(200).json(clientFound);
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

//Update client profile details
router.put("/api/clients/:id", function (req, res) {
  Client.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedClient) => {
      if (updatedClient) {
        res.status(200).json(updatedClient);
      }
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

//Update client password via PATCH
router.patch("/api/clients/:id", function (req, res) {
  let updatedClient = Client.findById(req.params.id);

  updatedClient.then((client) => {
    if (req.body.password) {
      client.password = req.body.password;
    }
    client.save();
    res.status(200).json('Updated password successfully!');
  })
  .catch((clientNotFound) => {
    res.send(clientNotFound);
  });
});

module.exports = router;
