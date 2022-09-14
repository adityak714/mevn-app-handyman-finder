var express = require('express');
var router = express.Router();
var Request = require('../../Infrastructure/models/RequestSchema');
var Client = require("../../Infrastructure/models/ClientSchema")

//Creates a request
router.post('/api/requests', function(req, res) {
    let new_request = new Request(req.body);
    new_request.save(function(err, new_request){
        if(err) {
            res.send(err);
        }
        res.status(201).json(new_request);
    })
});
//Update a request by id
router.put("/api/requests/:id", function (req, res) {
    Request.findByIdAndUpdate(req.params.id, req.body)
      .then(updatedRequest => {
        if (updatedRequest) {
          res.status(200).json(updatedRequest);
        }
      })
      .catch((err) => {
        res.status(404).send(err);
      })
    });  
  
//Getting a specific request 
router.get('/api/requests/:id',function(req,res,next) {
    Request.findById(req.params.id).then(request => {
        return res.status(200).json(request);
    }).catch(err => next(err));
});
//Getting all requests
router.get('/api/requests', function(req, res, next) {
    Request.find(function(err, requests) {
        if (err) { return next(err); }
        res.json({"requests": requests});
    });
}); 




module.exports = router;