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

module.exports = router;
