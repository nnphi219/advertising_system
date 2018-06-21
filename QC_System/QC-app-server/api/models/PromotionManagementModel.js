'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PromotionManagementSchema = new Schema({
    ma_khuyen_mai: String,
    mo_ta_khuyen_mai: String,
    muc_gia_ap_dung: {
        loai_gia: Number, //1 - percent, 2 - value(VND)
        gia_tri: Number
    },
    trang_thai: Number,
    nguoi_tao: {
        type: String,
        require: true
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
    }
});

module.exports = mongoose.model('promotions', PromotionManagementSchema);