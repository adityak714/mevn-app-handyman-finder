var express = require("express");
var router = express.Router();
var HandyMan = require("../../Infrastructure/models/HandyManSchema");
const Review = require("../../Infrastructure/models/ReviewSchema");
const Request = require("../../Infrastructure/models/RequestSchema");

var  SHA3  = require('sha3');
const jwt = require('jsonwebtoken');
var encryptionJWTKey = require('../../Domain/Constants.js');

//Sign up handyman
router.post("/api/handymen", function (req, res, next) {
  
  const hash = new SHA3.SHA3(512);
  hash.update(req.body.password);
  
  req.body.password = hash.digest('hex');

  req.body.accessToken = jwt.sign({
    data: '123'
  }, encryptionJWTKey);

  var handyMan = new HandyMan(req.body);
  
  handyMan.save(function (err, handyMan) {
    if (err) {
      res.send(err);
    }
    res.status(201).json(handyMan);
  });
});

//create a new review for a handyman (needs to be validated by which CLIENT is creating it)
router.post("/api/handymen/:id/reviews", async function (req, res) {
  let review = new Review(req.body);
  review.save(function (err, new_review) {
    if (err) {
      return res.send(err);
    }
    HandyMan.findById(new_review.to, (err, handyman) => {
      handyman.reviews.push(new_review._id);
      handyman.save().then(() => {
        return res.status(201).json(new_review);
      });
    });
  });
});

//Get all handymen
router.get("/api/handymen", function (req, res, next) {
  HandyMan.find({}).then(function (err, handymen) {
    if (err) {
      return res.send(err);
    }
    return res.status(200).json({ handymen: handymen });
  });
});

//Get specific handyman
router.get("/api/handymen/:id", function (req, res, next) {
  HandyMan.findById(req.params.id)
    .populate("reviews")
    .then((handyman) => {
      if (handyman) {
        return res.status(200).json(handyman);
      } else {
        return res.send("No such handyman exists!");
      }
    });
});

//Get a specific handyman's reviews list
router.get("/api/handymen/:id/reviews", async function (req, res) {
  HandyMan.findById(req.params.id, { reviews: 1 })
    .populate("reviews")
    .exec((err, handyman) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).json(handyman.reviews);
    });
});

//Update handyman profile details
router.put("/api/handymen/:id", function (req, res) {
  HandyMan.findById(req.params.id, (err, handyman) => {
    if (err) return res.status(500).send(err);
    if (!handyman) {
      return res.status(404).send("No such handyman exists!");
    }
  })
    .then((handyman) => {
      handyman.firstName = req.body.firstName;
      handyman.lastName = req.body.lastName;
      handyman.phoneNumber = req.body.phoneNumber;
      handyman.address = req.body.address;
      handyman.profession = req.body.profession;
      handyman.save(() => {
        return res.status(200).json(handyman);
      });
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
});

//Patch handyman password
router.patch("/api/handymen/:id", function (req, res) {
  HandyMan.findById(req.params.id, (err, handyman) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!handyman) {
      return res.status(404).send("No such handyman exists!");
    }
    handyman.firstName = req.body.firstName || handyman.firstName;
    handyman.lastName = req.body.lastName || handyman.lastName;
    handyman.password =
      new SHA3.SHA3(512).update(req.body.password).digest("hex") ||
      handyman.password;
    handyman.phoneNumber = req.body.phoneNumber || handyman.phoneNumber;
    handyman.address = req.body.address || handyman.address;
    handyman.profession = req.body.profession || handyman.profession;
    handyman.save(() => {
      return res.status(200).json(handyman);
    })
    .catch((handymanNotFound) => {
      return res.send(handymanNotFound);
    });
  });
});

//Delete all handymen
router.delete("/api/handymen", async function (req, res) {
  await HandyMan.collection
    .deleteMany({})
    .then(() => {
      return res.status(202).send("All handymen deleted successfully.");
    })
    .catch((err) => {
      return res.send(err);
    });
});

//Delete one handyman
router.delete("/api/handymen/:id", function (req, res) {
  HandyMan.findByIdAndRemove(req.params.id)
    .then((handyman) => {
      if (handyman == null) {
        return res.status(404).send('Handyman not found.')
      }
      res
        .status(204)
        .json(`User with id ${req.params.id} successfully deleted.`);
    })
    .catch((err) => {
      console.log(err);
      res.send('Handyman could not be deleted.');
    });
});

//Create a request for a handyman
router.post("/api/handymen/:id/requests", async function(req, res){
  let request = new Request(req.body);
  request.save(function (err, new_request) {
    if (err) {
      return res.send(err);
    }
    HandyMan.findById(new_request.handyman, (err, handyman) => {
      handyman.requests.push(new_request._id);
      handyman.save().then(() => {
        return res.status(201).json(new_request);
      });
    });
  });
})

//Retrieve all requests of a handyman
router.get("/api/handymen/:id/requests", async function(req, res) {
  HandyMan.findById(req.params.id, { requests: 1 })
  .populate("requests")
  .exec((err, handyman) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).json(handyman.requests);
  });
})

module.exports = router;