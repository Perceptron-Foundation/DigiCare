const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
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
        required : true,
    },
    familyHistry: {
        type : Number,
        required : true
    },
    priorMed: {
        type : Number,
        required : true
    },
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'report'
    }],
    doctor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    }],
    summary : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'summary'
    }]
},{ timestamps: true })

module.exports = mongoose.model('Patient', patientSchema);