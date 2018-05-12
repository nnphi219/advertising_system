'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ServicePriceSchema = new Schema({
    ma_gia: String,
    ma_dich_vu_ap_dung: String,
    gia_tri: Number,
    mo_ta_gia: String,
    loai_gia: String, // Table Price
    so_luong_don_vi_ap_dung: {//day, view, ...,
        so_ngay_ap_dung: Number,
        so_click_tren_view: Number
    },
    loai_co_che:{ //(độc quyền, cố định vị trí, Chia sẻ vị trí cố định, ngẫu nhiên)
        key: String,
        value: String
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
    },
    nguoi_tao: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('ServicePrices', ServicePriceSchema);