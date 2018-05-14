var mongoose = require('mongoose');
const _ = require('lodash');

var XsystemPageSchema = new mongoose.Schema({
    ma_trang_quang_cao: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    ten_trang_quang_cao: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    nguoi_tao: String,
    vung_quang_cao: [
        {
            ma_vung: String,
            ten_vung: String
        }
    ]
});

var XsystemPage = mongoose.model('xsystem_pages', XsystemPageSchema);
module.exports = XsystemPage;