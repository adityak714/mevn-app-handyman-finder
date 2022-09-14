var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var requestSchema = new Schema( {
    address: {type: String, required: true},
    status : {
        type: String,
        //default: () => "pending"
    },
    datetime: {
        type: Date,
        default: () => Date.now()
     },
    location: {type: String, required : true},
    description: {type: String, required : true},    
    job: {type: String, required: true},
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client"
    },
    handyman: {
        type: Schema.Types.ObjectId,
        ref: "Handyman"
    }
});

module.exports =  mongoose.model('Request', requestSchema);