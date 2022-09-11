var express = require("express");
var router = express.Router();
var Review = require("../../Infrastructure/models/ReviewSchema")

// Make a new review
router.post("/api/reviews", function (req, res) {
    let new_review = new Review({
      reviewer: req.body.reviewer,
      datetime: req.body.datetime,
      rating: req.body.rating,
      comment: req.body.comment,
    });
    new_review.save(function (err, new_review) {
      if (err) { res.send(err); }
      res.status(201).json(new_review);
    });
  });

// Get all reviews
router.get("/api/reviews", function (req, res) {
      Review.find((err, reviews) => {
          if (err) { res.send(err);}
          res.status(200).json({"reviews": reviews});
      });
  });

module.exports = router;