'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PriceFactorSchema = new Schema({
    ten_chi_so: String,
    ma_gia: String,
    don_vi_nhan_to: String, // table Factor's Unit
    loai_nhan_to: String, // (thời lượng, khung giờ, vị trí)
    gia_tri_ap_dung: String, //
    ti_le_tinh_gia: Number, // %
    gia_tri_thuc: Number,
    start_date: Date,
    end_date: Date,
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

module.exports = mongoose.model('PriceFactors', PriceFactorSchema);