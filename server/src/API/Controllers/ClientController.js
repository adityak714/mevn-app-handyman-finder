var express = require("express");
const { Mongoose } = require("mongoose");
const router = express.Router();
var Client = require("../../Infrastructure/models/ClientSchema");
const Request = require("../../Infrastructure/models/RequestSchema")

var  SHA3  = require('sha3');
const jwt = require('jsonwebtoken');
var encryptionJWTKey = require('../../Domain/Constants.js');

//Sign up client
router.post("/api/clients", function (req, res, next) {
  
  const hash = new SHA3.SHA3(512);
  hash.update(req.body.password);
  
  req.body.password = hash.digest('hex');

  req.body.accessToken = jwt.sign({
    data: '123'
  }, encryptionJWTKey);
  
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
  Client.findById(req.params.id, (err, client) => {
    if (!client) {
      return res.send('No such client exists!');
    }
  }).then((client) => {
    client.firstName = req.body.firstName;
    client.lastName = req.body.lastName;
    client.phoneNumber = req.body.phoneNumber;
    client.address = req.body.address;
    client.save(() => {
      return res.status(200).json(client);
    });
});

//Update client password via PATCH
router.patch("/api/clients/:id", function (req, res) {
  Client.findById(req.params.id, (err, client) => {
    if (!client) {
      return res.send('Client could not be found.');
    }
    client.firstName = req.body.firstName || client.firstName;
    client.lastName = req.body.lastName || client.lastName;
    client.password = new SHA3.SHA3(512).update(req.body.password).digest("hex") || client.password;
    client.phoneNumber = req.body.phoneNumber || client.phoneNumber;
    client.address = req.body.address || client.address;
    client.save(() => {
      return res.status(200).json(client);
    });
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
  Client.findByIdAndRemove(req.params.id, {useFindAndModify: false})
    .then((client) => {
      if (client == null) {
        return res.status(404).send('Client could not be found.')
      }
      res.status(204).json(`User with id ${req.params.id} successfully deleted.`);
    })
    .catch((err) => {
      console.log(err);
      return res.send('Client could not be deleted.');
    });
  });
});

//Create a request for a specific client
router.post("/api/clients/:id/requests", async function (req, res) {
  let request = new Request({
    client: req.params.id,
    address: req.body.address,
    priceRange: req.body.priceRange,
    date: req.body.date,
    handyman: req.body.handyman, 
    job: req.body.job, 
    description: req.body.description
  });
  request.save(function (err, new_request) {
    if (err) {
      return res.send(err);
    }
    Client.findById(new_request.client, (err, client) => {
      if (!client) return res.send('Client not found.')
      client.requests.push(new_request._id);
      client.save()
      .then(() => {
        res.status(201).json(new_request);
      })
    });
    HandyMan.findById(new_request.handyman, (err, handyman) => {
      if (!handyman) return res.send('Handyman not found.')
      handyman.requests.push(new_request._id);
      handyman.save()
      .then(() => {
        res.status(201).json(new_request);
      })
    });
  });
});

module.exports = router;
