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

//Sign Up Client
router.post('/api/client', async (req, res) => {
    const hash = new SHA3(512);
    hash.update(req.body.password);
    const newClient = new Client({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phonenumber,
        address: req.body.address,
        password: hash.digest('hex')
    })
    try {
        const client = await newClient.save();
        res.status(201).json(client);
    } catch (err) {
        return res.status(400).send('Fields are not filled correctly.')
    }
})

//Get already registered client
router.get('/api/client', (req, res) => {
    let token = req.body.accessToken;
    jwt.verify(token, 'secretkey', (err, payload) => {
        if (err) return res.status(401).send('Access denied.')
        Client.findOne({_id: payload._id}, (err, client) => {
            if (err) return res.send(err);
            return res.status(200).json({client: client});
        })
    })
})

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
            })
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

//Get authenticated user
router.get('/api/client', function (req, res, next) {
    let token = req.body.token;
    jwt.verify(token, 'secretkey', (err, client) => {
      User.findOne({_id: client._id}, (err, client) => {
          if(err) next(err);
          return res.status(200).json(client);
      })
    })
  })  

module.exports = router;
