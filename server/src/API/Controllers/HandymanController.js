var express = require("express");
var router = express.Router();
var HandyMan = require("../../Infrastructure/models/HandyManSchema");

//Sign up client
router.post("/api/handymen", function (req, res, next) {
  var handyMan = new HandyMan(req.body);
  handyMan.save(function (err, handyMan) {
    if (err) {
      res.send(err);
    }
    res.status(201).json(handyMan);
  });
});



//Get all handymen
router.get('/api/handymen', function(req, res, next){
  HandyMan.find({}, function(err, handymen){
    if(err){res.send(err)}
    res.status(200).json({'handymen': handymen})
  })
})

//Delete client
router.delete("/api/handymen/:id", function(req, res, next){
  HandyMan.findById(req.params.id).then(handyman => {
    return res.status(204).json(handyman);
  
  }).catch(err => next(err));
});

//Update client profile details
router.put("/api/handymen/:id", function (req, res) {
  HandyMan.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedHandyman) => {
      if (updatedHandyman) {
        res.status(200).json(updatedHandyman);
      }
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});


router.patch("/api/handymen/:id", function (req, res) {
  let updatedHandyman = HandyMan.findById(req.params.id, {password: 1});
  updatedHandyman
    .then((handyMan) => {
      if (req.body.password) {
        handyMan.password = req.body.password;
      }
      handyMan.save();
      res.status(200).json(handyMan);
    })
    .catch((handyMantNotFound) => {
      res.send(handyMantNotFound);
    });
});

module.exports = router;

