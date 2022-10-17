var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var requestSchema = new Schema( {
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    address: {
        type: String,
        required: true
    },    
    handyman: {
        type: Schema.Types.ObjectId,
        ref: "Handyman",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    job: {
        type: String, 
        required: true
    },
    creationDate: {
        type: Date,
        default: () => Date.now()
    },
    description: {
        type: String,
        maxLength: 1000
    },
    status: {
        type: String,
        enum: ['Accepted', 'Pending', 'Rejected'],
        default: 'Pending'
    }
});

module.exports =  mongoose.model('Request', requestSchema);