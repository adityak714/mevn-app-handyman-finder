var express = require('express');
var router = express.Router();
var Request = require('../../Infrastructure/models/RequestSchema');
var Client = require("../../Infrastructure/models/ClientSchema")

//Create a request
/*var createARequest = async function(req, res) {

    //let new_request = new Request(req.body);
    let new_request = new Request( {
        address : req.body.address,
        datetime : req.body.datetime,
        location : req.body.location,
        description: req.body.description,
        job: req.body.job
    });
    

    await new_request.save(function(err, new_request){
        if(err) {
            res.send(err);
        }
        res.status(201).json(new_request);
    })
}
router.post('api/requests', createARequest);
*/
router.post('/api/requests', function(req, res) {
    let new_request = new Request(req.body);
    new_request.save(function(err, new_request){
        if(err) {
            res.send(err);
        }
        res.status(201).json(new_request);
    })
});



module.exports = router;