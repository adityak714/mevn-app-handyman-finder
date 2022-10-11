var express = require("express");
var router = express.Router();
var Review = require("../../Infrastructure/models/ReviewSchema");
const HandyMan = require("../../Infrastructure/models/HandyManSchema");

// Make a new review
router.post("/api/reviews", function (req, res) {
  let review = new Review(req.body);
  review.save(function (err, new_review) {
    if (err) {
      return res.send(err);
    }
    HandyMan.findById(new_review.to, (err, handyman) => {
      handyman.reviews.push(new_review._id);
      handyman.save()
      .then(() => {
        return res.status(201).json(new_review);
      })
    });
  });
});

// Get all reviews
router.get("/api/reviews", function (req, res) {
  Review.find((err, reviews) => {
    if (err) {
      return res.send(err);
    }
    return res.status(200).json({ reviews: reviews });
  });
});

module.exports = router;
