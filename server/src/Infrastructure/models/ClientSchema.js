var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema ({
    id: { type: String},
    firstName: { type: String},
    lastName: { type: String},
    email: { type: String},
    phoneNumber : {type: int},
    address : {type: String},


});
module.exports = mongoose.model('clients', clientSchema);