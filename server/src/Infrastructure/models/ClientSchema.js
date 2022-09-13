var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var clientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  address: { type: String, required: true }
});

module.exports = mongoose.model("clients", clientSchema);