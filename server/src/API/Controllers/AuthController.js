var express = require("express");
const { Mongoose } = require("mongoose");
const router = express.Router();
var Client = require("../../Infrastructure/models/ClientSchema");
var HandyMan = require("../../Infrastructure/models/HandyManSchema");
//Encription password
const { SHA3 } = require('sha3');
//JWT Authentication
const jwt = require('jsonwebtoken');
var encryptionJWTKey =  require('../../Domain/Constants.js');

//Sign In client
router.post("/api/auth/signin", async function (req, res) {

    const hash = new SHA3(512);
    hash.update(req.body.password);
       
    var email = req.body.email;
    var password = hash.digest('hex');
  
    var client = await Client.findOne({email: email, password: password});
    
    if(client == null){
        var handyman = await HandyMan.findOne({email: email, password: password});
        if(handyman == null){
            res.status(404);
        }
        else {
            handyman.accessToken = jwt.sign({
                data: '123'
              }, encryptionJWTKey);
            
            handyman.save(function (err, handyman) {
            if (err) {
            res.status(400).send(err);
            }
            res.status(201).json(handyman);
            });
        }
    }
    else {
        client.accessToken = jwt.sign({
            data: '123'
          }, encryptionJWTKey);
        
        client.save(function (err, client) {
            if (err) {
            res.status(400).send(err);
            }
            res.status(201).json(client);
        });
    }
});

module.exports = router;
