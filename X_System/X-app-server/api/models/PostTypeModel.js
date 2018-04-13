var mongoose = require('mongoose');
const _ = require('lodash');

var PostTypeSchema = new mongoose.Schema({
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
    }
});

var PostType = mongoose.model('PostTypes', PostTypeSchema);
module.exports = PostType;