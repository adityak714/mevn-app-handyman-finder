var express = require('express');
var router = express.Router();
var Client = require("../Infrastructure/models/ClientSchema");

//Sign up client
router.post('/api/clients', function(req, res,next) {
    var client = new Client({
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
        phoneNumber : req.body.phoneNumber,
        address : req.body.address
    });
    Client.save(function (err, client) {
        if (err) { res.send(err); }
        res.status(201).json(client);
    });
});

//Get all clients
router.get("/api/clients", function (req, res) {
    Client.find((err, clients) => {
        if (err) { res.send(err);}
        res.status(200).json({"clients": clients});
    });
});


