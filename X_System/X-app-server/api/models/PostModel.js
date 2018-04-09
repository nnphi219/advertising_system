var mongoose = require('mongoose');
const _ = require('lodash');

var PostSchema = new mongoose.Schema({
    ma_bai_dang: {
        type: String,
        unique: true,
        required: true,
        minlength: 1,
        unique: true,
        trim: true
    },
    tieu_de: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    noi_dung: {
        type: String,
        require: true,
        minlength: 6
    },
    imageUrls: [{
        type: String
    }],
    url: {
        type: String,
        require: true
    },
    nguoi_tao: {
        type: String,
        require: true
    }
});

// PostSchema.methods.toJSON = function () {
//     var post = this;
//     var postObject = post.toObject();

//     return _.pick(userObject, ['_id', 'email', 'username', 'user_type']);
// };

var Post = mongoose.model('Posts', PostSchema);
module.exports = Post;