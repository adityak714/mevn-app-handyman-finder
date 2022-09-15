var express = require("express");
const { Mongoose } = require("mongoose");
const router = express.Router();
var Client = require("../../Infrastructure/models/ClientSchema");
const Request = require("../../Infrastructure/models/RequestSchema")
//Sign up client
router.post("/api/clients", function (req, res, next) {
  var client = new Client(req.body);
  client.save(function (err, client) {
    if (err) {
      res.status(400).send(err);
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
//Get all requests for a client(Client must exist and verified)
router.get("/api/clients/:id/requests", async function (req, res) {
  Client.findById(req.params.id, { requests: 1 })
    .populate("requests")
    .exec((err, client) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).json(client.requests);
    });
});

//Get a specific client
router.get("/api/clients/:id", function (req, res, next) {
  Client.findById(req.params.id)
    .then((clientFound) => {
      if (clientFound) {
        res.status(200).json(clientFound);
      } else {
        res.send("No such client exists!");
      }
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
  let updatedClient = Client.findById(req.params.id, {password: 1});
  updatedClient
    .then((client) => {
      if (req.body.password) {
        client.password = req.body.password;
      }
      client.save();
      res.status(200).json(client);
    })
    .catch((clientNotFound) => {
      res.send(clientNotFound);
    });
});

//Delete all clients
router.delete("/api/clients", async function (req, res) {
  await Client.collection
    .deleteMany({})
    .then(() => {
      res.status(202).send("All clients deleted successfully.");
    })
    .catch((err) => {
      res.send(err);
    });
});

//Delete a specific client
router.delete("/api/clients/:id", function (req, res) {
  Client.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json(`User with id ${req.params.id} successfully deleted.`);
    })
    .catch((err) => {
      res.send(`${err} User could not be deleted.`);
    });
});

module.exports = router;
