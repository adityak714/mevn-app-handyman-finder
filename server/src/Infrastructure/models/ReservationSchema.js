var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var reservationSchema = new Schema( {
    id: {type: String},
    address: {type: String},
    date: {type: Date},
    time:{type: time},
    location: {type: String},
    description: {type: String},
    job: {type: String}
});

module.exports =  mongoose.model('reservations', reservationSchema);
