var mongoose = require('mongoose');
var Review = require('./ReviewSchema');
var Schema = mongoose.Schema;

var handymenSchema = new Schema ({
    id: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phoneNumber : { type: Number },
    area : { type: String },
    profession: { type: String },
    reviews: { type: [Review] }
});

module.exports = mongoose.model('handymen', handymenSchema);