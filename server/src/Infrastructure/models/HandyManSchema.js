var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var handymenSchema = new Schema ({
    accessToken: {type: String},
    firstName: { type: String , required : true},
    lastName: { type: String, required : true },
    email: { type: String, required : true},
    password: {type: String, required: true},
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