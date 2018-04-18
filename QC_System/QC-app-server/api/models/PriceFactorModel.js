'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PriceFactorSchema = new Schema({
    ma_chi_so: String,
    ten_chi_so: String,
    ma_gia: String, //get from ServicePrice
    don_vi_nhan_to: String, // table Factor's Unit
    loai_nhan_to:  {// (thời lượng, khung giờ, vị trí)
        thoi_luong: Number,
        khung_gio: {
            bat_dau: Number,
            ket_thuc: Number
        },
        vi_tri: {
            tinh: String,
            quan_huyen: String
        }
    },
    gia_tri_ap_dung: String, //
    ti_le_tinh_gia: {
        tang: Number, // %
        gia_tri: Number
    },
    gia_tri_thuc: Number,
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

module.exports = mongoose.model('PriceFactors', PriceFactorSchema);