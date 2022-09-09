var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var reservationSchema = new Schema( {
    id: {type: String},
    address: {type: String},
    datetime: {type: Date},
    location: {type: String},
    description: {type: String},
    job: {type: String}
});

module.exports =  mongoose.model('reservations', reservationSchema);
