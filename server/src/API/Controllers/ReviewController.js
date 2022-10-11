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
      handyman.save().then(() => {
        return res.status(201).json(new_review);
      });
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

//Getting a specific review
router.get("/api/reviews/:id", function (req, res, next) {
  Review.findById(req.params.id)
    .then((review) => {
      return res.status(200).json(review);
    })
    .catch((err) => next(err));
});

//Update a review by id
router.put("/api/reviews/:id", function (req, res) {
  Review.findById(req.params.id, (err, review) => {
    if (err) return res.status(500).send(err);
    if (!review) {
      return res.status(404).send('Review could not be found.');
    }
  }).then((review) => {
    review.rating = req.body.rating;
    review.comment = req.body.comment;
    review.save(() => {
      return res.status(200).json(review);
    });
  }).catch((err) => {
    return res.status(500).send(err);
  })
});

//Update a review by id
router.patch("/api/reviews/:id", function (req, res) {
  Review.findById(req.params.id, (err, review) => {
    if (err) return res.status(500).send(err);
    if (!review) {
      return res.status(404).send('Review could not be found.');
    }
  }).then((review) => {
    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    review.save(() => {
      return res.status(200).json(review);
    });
  }).catch((err) => {
    return res.status(500).send(err);
  })
});

//Delete a review by id
router.delete('/api/reviews/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const review = await Review.findByIdAndDelete(_id);
    if (!review) return res.status(200).json({
      "error": "Review does not exist and could not be deleted."
    });
   return res.status(204).send(review);
  } catch (e) {
   return res.sendStatus(400).send(err);
  }
})

//Delete all reviews 
router.delete('/api/reviews', function(req, res) {
  Review.deleteMany({}, function(err, reviews) {
      if (err) {
        return res.send(err);
      } if (reviews == null) {
        return res.status(200).send("No reviews found.");
      }
      return res.status(204).send("All review deleted.");
  })
})

module.exports = router;
