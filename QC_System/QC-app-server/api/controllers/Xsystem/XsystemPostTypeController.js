'use strict';

var mongoose = require('mongoose'),
    XsystemPostType = mongoose.model('xsystem_post_types');

exports.list_all_postTypes = function (req, res) {
    let creator = req.user.username;
    let conditionFilter = {
        nguoi_tao: creator
    };

    XsystemPostType.find(conditionFilter, function (err, postType) {
        if (err)
            res.send(err);
        res.json(postType);
    });
};

exports.read_a_postType_by_postTypeId = (req, res) => {
    let creator = req.user.username;
    let postTypeId = req.params.postTypeId;
    let conditionFilter = {
        nguoi_tao: creator,
        ma_loai_bai_dang: postTypeId
    };

    XsystemPostType.findOne(conditionFilter, function (err, postType) {
        if (err)
            res.send(err);
        res.json(postType);
    });
};

exports.list_all_postTypes_for_qc = function (req, res) {
    XsystemPostType.find({}, function (err, postTypes) {
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
    var creator = req.user.username;
    var new_postType = new XsystemPostType(req.body);
    new_postType.nguoi_tao = creator;

    new_postType.save(function (err, postType) {
        if (err)
            res.send(err);
        res.json(postType);
    });
};


exports.read_a_postType = function (req, res) {
    XsystemPostType.findById(req.params.postTypeId, function (err, postType) {
        if (err)
            res.send(err);
        res.json(postType);
    });
};

exports.read_a_postType_by_PostTypeId = function (req, res) {
    XsystemPostType.findOne({ ma_loai_bai_dang: req.params.postTypeId }, function (err, postType) {
        if (err)
            res.send(err);
        res.json(postType);
    });
};

exports.update_a_postType = function (req, res) {
    XsystemPostType.findOneAndUpdate({ _id: req.params.postTypeId }, req.body, { new: true }, function (err, postType) {
        if (err)
            res.send(err);
        res.json(postType);
    });
};


exports.delete_a_postType = function (req, res) {
    XsystemPostType.remove({
        _id: req.params.postTypeId
    }, function (err, postType) {
        if (err)
            res.send(err);
        res.json({ message: 'postType successfully deleted' });
    });
};