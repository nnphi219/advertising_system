'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ServicePriceSchema = new Schema({
    PriceID: String,
    AppliedServiceID: String,
    Value: Number,
    PriceDescription: String,
    PriceType: Number, // Table Price
    AppliedUnitNumber: Number, //day, view, ...,
    MechanismType: String, //(độc quyền, cố định vị trí, chia sẻ cố định, ngẫu nhiên)
    DateStart: Date,
    DateEnd: Date,
    Status: Number,
    Created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ServicePrice', ServicePriceSchema);