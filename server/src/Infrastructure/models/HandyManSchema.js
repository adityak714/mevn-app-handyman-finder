var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var handymenSchema = new Schema ({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: {type: String},
    phoneNumber : { type: Number },
    area : { type: String },
    profession: { type: String },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    requests: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Request'
        }
    ]
});

module.exports = mongoose.model('Handyman', handymenSchema);