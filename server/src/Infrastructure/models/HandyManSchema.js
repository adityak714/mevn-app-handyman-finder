var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var handymenSchema = new Schema({
  accessToken: {
    type: String
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  phoneNumber: {
    type: Number,
    required: true,
    minLength: 7,
    maxLength: 11,
  },
  area: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    enum: [
      "Carpenter",
      "Mason",
      "Electrician",
      "Painter",
      "Plumber",
      "Window Repair",
    ],
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  requests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
});

module.exports = mongoose.model("Handyman", handymenSchema);
