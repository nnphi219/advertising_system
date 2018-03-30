'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostCampaignManagementSchema = new Schema({
    ma_chien_dich: String,
    ma_bai_dang: String,
    ma_khuyen_mai: String,
    co_che_hien_thi: String,
    tinh_theo_gia: String,
    
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
    don_gia_co_ban: Number,
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
    thanh_tien: Number,
    tong_cong: Number,
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

module.exports = mongoose.model('PostCampaignManagements', PostCampaignManagementSchema);