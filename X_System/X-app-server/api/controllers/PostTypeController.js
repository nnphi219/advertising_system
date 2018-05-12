'use strict';

var mongoose = require('mongoose'),
    PostType = mongoose.model('PostTypes');

exports.list_all_postTypes = function (req, res) {
    PostType.find({}, function (err, postType) {
        if (err)
            res.send(err);
        res.json(postType);
    });
};

exports.list_all_postTypes_for_qc = function (req, res) {
    PostType.find({}, function (err, postTypes) {
        if (err)
            res.send(err);
       
        var postTypes_for_qc = postTypes.map((postType) => {
            return {
                ma_loai_bai_dang: postType.ma_loai_bai_dang,
                ten_loai_bai_dang: postType.ten_loai_bai_dang
            }
        });

        res.json(postTypes_for_qc);
    });
};

exports.create_a_postType = function (req, res) {
    var new_postType = new PostType(req.body);
    new_postType.save(function (err, postType) {
        if (err)
            res.send(err);
        res.json(postType);
    });
};


exports.read_a_postType = function (req, res) {
    PostType.findById(req.params.postTypeId, function (err, postType) {
        if (err)
            res.send(err);
        res.json(postType);
    });
};

exports.read_a_postType_by_PostTypeId = function (req, res) {
    PostType.findOne({ ma_loai_bai_dang: req.params.postTypeId }, function (err, postType) {
        if (err)
            res.send(err);
        res.json(postType);
    });
};

exports.update_a_postType = function (req, res) {
    PostType.findOneAndUpdate({ _id: req.params.postTypeId }, req.body, { new: true }, function (err, postType) {
        if (err)
            res.send(err);
        res.json(postType);
    });
};


exports.delete_a_postType = function (req, res) {
    PostType.remove({
        _id: req.params.postTypeId
    }, function (err, postType) {
        if (err)
            res.send(err);
        res.json({ message: 'postType successfully deleted' });
    });
};