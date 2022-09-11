var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var requestSchema = new Schema( {
    address: {type: String, required: true},
    status : {
        type: String,
        enum: ["ACCEPTED", "PENDING", "REJECTED"]
        //default: () => "pending"
    },
    datetime: {
        type: Date,
        default: () => Date.now()
     },
    location: {type: String},
    description: {type: String},    
    job: {type: String},
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: true
    }
});

module.exports =  mongoose.model('Request', requestSchema);