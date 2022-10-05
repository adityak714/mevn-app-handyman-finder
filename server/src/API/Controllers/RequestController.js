var express = require("express");
var router = express.Router();
var Request = require("../../Infrastructure/models/RequestSchema");
var Client = require("../../Infrastructure/models/ClientSchema");
var HandyMan = require("../../Infrastructure/models/HandyManSchema");

//Creates a request
router.post("/api/requests", function (req, res) {
  let request = new Request(req.body);
  request.save(function (err, new_request) {
    if (err) {
      return res.send(err);
    }
    Client.findById(new_request.client, (err, client) => {
      if (err) return res.status(500).send(err);
      if (!client) return res.status(400).send("Client does not exist.");
      client.requests.push(new_request._id);
      client.save();
    });
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

//Getting all requests
router.get("/api/requests", function (req, res, next) {
  Request.find(function (err, requests) {
    if (err) {
      return next(err);
    }
    res.json({ requests: requests });
  });
});

//Getting a specific request
router.get("/api/requests/:id", function (req, res, next) {
  Request.findById(req.params.id)
    .then((request) => {
      return res.status(200).json(request);
    })
    .catch((err) => next(err));
});

//Update a request by id
router.put("/api/requests/:id", function (req, res) {
  Request.findById(req.params.id, (err, request) => {
    if (err) return res.status(500).send(err);
    if (!request) {
      return res.status(404).send("Request could not be found.");
    }
  })
    .then((request) => {
      request.address = req.body.address;
      request.status = req.body.status;
      request.save(() => {
        return res.status(200).json(request);
      });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

//Patch a request by id
router.patch("/api/requests/:id", function (req, res) {
  Request.findById(req.params.id, (err, request) => {
    if (err) return res.status(500).send(err);
    if (!request) {
      return res.status(404).send("Request could not be found.");
    }
  })
    .then((request) => {
      request.address = req.body.address || request.address;
      request.status = req.body.status || req.body.status;
      request.save(() => {
        return res.status(200).json(request);
      });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

//Delete a request by id
router.delete("/api/requests/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const request = await Request.findByIdAndDelete(_id);
    if (!request)
      return res
        .status(200)
        .json({ error: "Request does not exist and could not be deleted." });
    return res.status(204).send(request);
  } catch (e) {
    return res.sendStatus(400);
  }
});

//Delete all requests
router.delete("/api/requests", function (req, res) {
  Request.deleteMany({}, function (err, requests) {
    if (err) {
      return res.send(err);
    }
    if (requests == null) {
      return res.status(404).send("No requests found.");
    }
    res.status(204).send("All requests deleted.");
  });
});

module.exports = router;
