var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const reviewSchema = new Schema({
  datetime: { type: Date, default: () => {Date.now()} },
  rating: { type: Number },
  comment: { type: String },
  sender: { 
    type: Schema.Types.ObjectId, 
    ref: "Client",
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "Handyman",
    required: true
  }
});

module.exports = mongoose.model("Review", reviewSchema);
