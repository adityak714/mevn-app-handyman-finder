var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var handymenSchema = new Schema ({
    id: { type: String},
    firstName: { type: String},
    lastName: { type: String},
    email: { type: String},
    phoneNumber : {type: Number},
    area : {type: String},
    profession: {type:String}


});
module.exports = mongoose.model('handymen', handymenSchema);