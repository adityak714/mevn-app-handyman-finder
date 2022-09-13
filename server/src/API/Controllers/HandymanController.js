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

router.get("/api/handymen", function (req, res, next) {
  HandyMan.find({}, function(err, handymen){
    if (err){res.status(404).send(err)}
    res.status(200).json({"handyman": handymen})
  })
})

//Delete client
router.delete("/api/handymen/:id", function(req, res, next){
  HandyMan.findById(req.params.id).then(handyman => {
    return res.status(204).json(handyman);
  
  }).catch(err => next(err));
});


router.put('/api/handymen/:id', function(req, res, next){
  HandyMan.findByIdAndUpdate(req.params.id, req.body).then(updatedHandyman => {
    if(updatedHandyman == null){res.status(404).send("The handyman could not be updated")}
    res.status(200).json(updatedHandyman);
  })
})

module.exports = router;
