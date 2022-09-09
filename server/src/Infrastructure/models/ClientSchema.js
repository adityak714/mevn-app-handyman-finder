var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema ({
    firstName: { type: String},
    lastName: { type: String},
    email: { type: String},
    phoneNumber : {type: Number},
    address : {type: String}
});

module.exports = mongoose.model('clients', clientSchema);