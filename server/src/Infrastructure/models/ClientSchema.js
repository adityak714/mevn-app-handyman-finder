const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  accessToken: {type: String},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password : {type: String, required: true},
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  address: { type: String, required: true },
  requests: [{
    type: Schema.Types.ObjectId,
    ref: "Request"
  }]
});

module.exports = mongoose.model("Client", clientSchema);