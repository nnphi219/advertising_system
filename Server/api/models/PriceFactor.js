'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PriceFactorSchema = new Schema({
    FactorName: String,
    PriceID: String,
    FactorUnit: String, // table Factor's Unit
    FactorType: String, // (thời lượng, khung giờ, vị trí)
    AppliedValuation: String, //
    RateCalculation: Number, // %
    RealPrice: Number,
    DateStart: Date,
    DateEnd: Date,
    Status: Number,
    Created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PriceFactor', PriceFactorSchema);