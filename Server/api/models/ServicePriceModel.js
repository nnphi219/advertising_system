'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ServicePriceSchema = new Schema({
    ma_gia: String,
    ma_dich_vu_ap_dung: String,
    gia_tri: Number,
    mo_ta_gia: String,
    loai_gia: Number, // Table Price
    so_luong_don_vi_ap_dung: Number, //day, view, ...,
    loai_co_che: String, //(độc quyền, cố định vị trí, chia sẻ cố định, ngẫu nhiên)
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

module.exports = mongoose.model('ServicePrices', ServicePriceSchema);