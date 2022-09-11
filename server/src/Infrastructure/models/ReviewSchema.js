const mongoose = require('mongoose');

const ReviewSchema = mongoose.model('reviews', new mongoose.Schema({
    reviewer: { type: Number },
    datetime: { type: Date },
    rating: { type: Number }, 
    comment: { type: String }
}));

module.exports = ReviewSchema;