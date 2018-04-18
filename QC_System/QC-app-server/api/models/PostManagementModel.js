'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostManagementSchema = new Schema({
    ma_bai_dang: String,
    ma_dich_vu: String,
    trang_hien_thi: String,
    tieu_de_hien_thi: String,
    mo_ta_bai_dang: String,
    anh_dai_dien: String,
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

module.exports = mongoose.model('PostManagement', PostManagementSchema);