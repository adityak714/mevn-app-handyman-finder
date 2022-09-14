var express = require("express");
var router = express.Router();
var HandyMan = require("../../Infrastructure/models/HandyManSchema");
const Review = require("../../Infrastructure/models/ReviewSchema");

//Sign up handyman
router.post("/api/handymen", function (req, res, next) {
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
  HandyMan.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedHandyman) => {
      if (updatedHandyman) {
        return res.status(200).json(updatedHandyman);
      }
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
});

//Patch handyman password
router.patch("/api/handymen/:id", function (req, res) {
  let updatedHandyman = HandyMan.findById(req.params.id, { password: 1 });
  updatedHandyman
    .then((handyman) => {
      if (req.body.password) {
        handyman.password = req.body.password;
      }
      handyman.save;
      return res.status(200).json(handyman);
    })
    .catch((handymanNotFound) => {
      return res.send(handymanNotFound);
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
router.delete("/api/handymen/:id", function (req, res, next) {
  HandyMan.findById(req.params.id)
    .then((handyman) => {
      return res.status(204).json(handyman);
    })
    .catch((err) => next(err));
});

module.exports = router;
