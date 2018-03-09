'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AdvertisingAreaSchema = new Schema({
    AdvertisingServiceID: String,
    AdvertisingName: String,
    AdvertisingDescription: String,
    PostApplyType: String,
    TitleColor: String,
    TitleFontFamily: String,
    TitleFontSize: Float,
    BorderSize: Float,
    HaveBorder: Boolean,
    BorderColor: String,
    DescriptionNumberOfWord: Number,
    Avatar: String, // Image or video
    NumberOfShowedImage,
    AllowedImageStorage: Number,
    AllowedVideoStorage: Number,
    AppliedAdvertisingPageType: String, //
    MaxPostNumber: Number,
    AreaSharingNumber: Number,
    AreaSize: [{ 
        Width: Number,
        Height: Number
    }],
    PostSize: [{ 
        Width: Number,
        Height: Number
    }],
    Status: Number,
    Created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AdvertisingAreas', AdvertisingAreaSchema);