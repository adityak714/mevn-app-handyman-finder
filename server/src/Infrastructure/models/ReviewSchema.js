var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const reviewSchema = new Schema ({
    reviewer: { type: Number },
    datetime: { type: Date },
    rating: { type: Number }, 
    comment: { type: String },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Handyman'
    }
});

module.exports = mongoose.model('reviews', reviewSchema)
