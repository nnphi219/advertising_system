'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PromotionManagementSchema = new Schema({
    ma_khuyen_mai: String,
    mo_ta: String,
    ma_dich_vu_ap_dung: String,
    muc_gia_ap_dung: {
        loai_gia: Number, //1 - percent, 2 - value(VND)
        gia_tri: Number
    },
    start_date: {
        day: Number,
        month: Number,
        year: Number
    },
    end_date: {
        day: Number,
        month: Number,
        year: Number
    },
    trang_thai: Number,
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PromotionManagements', PromotionManagementSchema);