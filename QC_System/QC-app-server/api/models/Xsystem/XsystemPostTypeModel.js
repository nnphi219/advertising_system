var mongoose = require('mongoose');
const _ = require('lodash');

var XsystemPostTypeSchema = new mongoose.Schema({
    ma_loai_bai_dang: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    ten_loai_bai_dang: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    nguoi_tao: String
});

var XsystemPostType = mongoose.model('xsystem_post_types', XsystemPostTypeSchema);
module.exports = XsystemPostType;