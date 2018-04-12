var mongoose = require('mongoose');
const _ = require('lodash');

var PageSchema = new mongoose.Schema({
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
    }
});

var Page = mongoose.model('Pages', PageSchema);
module.exports = Page;