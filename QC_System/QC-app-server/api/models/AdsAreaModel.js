'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdsAreaSchema = new Schema({
    ma_dich_vu: String,
    ten_hien_thi: String,
    loai_quang_cao: String,
    mo_ta_dich_vu: String,
    loai_bai_dang_ap_dung: String,
    mau_chu_tieu_de: String,
    font_tieu_de: String,
    font_size_tieu_de: Number,
    kich_thuoc_vien: Number,
    co_vien: Boolean,
    mau_vien: String,
    so_luong_chu_mo_ta: Number,
    avatar: String, // Image or video
    so_luong_anh: Number,
    kich_thuoc_anh: Number,
    kich_thuoc_video: Number,
    loai_trang_ap_dung: String, //
    so_luong_tin_toi_da: Number,
    so_luong_chia_se_vung: Number,
    hieu_ung_tieu_de: String, // hiệu ứng tiêu đề.
    kich_thuoc_vung: { 
        width: Number,
        height: Number
    },
    kich_thuoc_tin: { 
        width: Number,
        height: Number
    },
    status: Number,
    so_luong_chu_xem_truoc: Number,
    hien_thi_video_thay_the_anh: Boolean,
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AdsAreas', AdsAreaSchema);