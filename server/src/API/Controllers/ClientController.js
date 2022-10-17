var express = require("express");
const { Mongoose } = require("mongoose");
const router = express.Router();
var SHA3 = require('sha3');
const jwt = require('jsonwebtoken');
var encryptionJWTKey = require('../../Domain/Constants.js');

const Client = require("../../Infrastructure/models/ClientSchema");
const Request = require("../../Infrastructure/models/RequestSchema");
const HandyMan = require("../../Infrastructure/models/HandyManSchema");

//Sign Up Client
router.post('/api/clients', async function (req, res) {
  const hash = new SHA3.SHA3(512);
  hash.update(req.body.password);
  await Client.findOne({email: req.body.email}, (err, client) => {
    if (err) return res.status(500).send(err);
    if (client === null) {
      const newClient = new Client({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        password: hash.digest('hex'),
        accessToken: jwt.sign({ data: "123" }, encryptionJWTKey)
      })
      newClient.save(function (err, client) {
        if (err) {
            return res.status(400).send('Details are not filled correctly.');
        }
        return res.status(201).json(client);
      });
    } else {
      return res.status(400).send('A client with that email already exists.');
    }
  })    
})

//Get all clients
router.get("/api/clients", function (req, res, next) {
  Client.find({}, function (err, clients) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ clients: clients });
  });
});

//Get a specific client
router.get("/api/clients/:id", function (req, res, next) {
  Client.findById(req.params.id).populate("requests")
  .then((clientFound) => {
    if (clientFound) {
      res.status(200).json(clientFound);
    } else {
      res.send("No such client exists!");
    }})
  .catch((err) => {
    return res.send(err);
  });
});

//Update client profile details
router.put("/api/clients/:id", function (req, res) {
  Client.findById(req.params.id, (err, client) => {
    if (err) {return res.status(500).send(err);}
    if (!client) {
      return res.status(404).send('Client could not be found.');
    }
  }).then((client) => {
    client.firstName = req.body.firstName;
    client.lastName = req.body.lastName;
    client.phoneNumber = req.body.phoneNumber;
    client.address = req.body.address;
    client.save(() => {
      return res.status(200).json(client);
    });
  }).catch((err) => {
    return res.status(500).send('Please fill in all the fields.');
  })
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
  }).catch((err) => {
    return res.status(500).send(err);
  });
});

//Delete all clients
router.delete("/api/clients", async function (req, res) {
  await Client.collection
    .deleteMany({})
    .then(() => {
      res.status(204).send("All clients deleted successfully.");
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
      if (err) return res.status(500).send(err);
      if (!client) return res.status(400).send("Client does not exist.");
      client.requests.push(new_request._id);
      client.save().then(() => {    
        HandyMan.findById(new_request.handyman, (err, handyman) => {
          if (err) return res.status(500).send(err);
          if (!handyman) return res.status(400).send("Handyman does not exist.");
          handyman.requests.push(new_request._id);
          handyman.save().then(() => {
            res.status(201).json(new_request);
          });
        });
      });
    });
  })
});

//Get all requests that a client has made (Client must exist and verified)
router.get("/api/clients/:id/requests", async function (req, res) {
  Client.findById(req.params.id, { requests: 1 })
    .populate("requests")
    .exec((err, client) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (!client) {
        return res.status(404).send('Client was not found.')
      }
      return res.status(200).json(client.requests);
    });
});

//Get a specific request of a specific client
router.get("/api/clients/:id/requests/:rq_id", function (req, res) {
  Client.find({_id: req.params.id}, {requests: req.params.rq_id}, {_id: 0, requests: 1})
  .populate("requests")
  .exec((err, client) => {
    let result = client[0].requests;
    if (err) {
      return res.send(err);
    }
    return res.status(200).json(result[0]);
  });
});

//Delete specific request in specific handyman
router.delete("/api/clients/:id/requests/:rq_id", function (req, res) {
  Client.findById(req.params.id, (err, client) => {
    if (err) return res.status(500).send(err);
    if (!client) return res.status(404).send("Client does not exist.");
    Request.findByIdAndRemove(
        req.params.rq_id,
        { useFindAndModify: false },
        (err, request) => {
          if (err) return res.status(500).send(err);
          if (!request) return res.status(404).send("Request does not exist.");
          res.status(204).json(`Request deleted of client ${req.params.id}`);
        }
    );
  });
});


module.exports = router;
