const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    auth0Id:{
        type : String,
        required : true
    },
    name: {
        type : String,
        required : true
    },
    age: {
        type : Number,
        required : true
    },
    bloodGroup : {
        type : String,
        
    },
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient'
    }],
    summary: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'summary'
    }]
},{ timestamps: true })

module.exports = mongoose.model('Doctor', doctorSchema);