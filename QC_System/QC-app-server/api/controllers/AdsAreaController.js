'use strict';
const _ = require('lodash');

var mongoose = require('mongoose'),
    AdsArea = mongoose.model('AdsAreas');

exports.list_all_adsAreas = function (req, res) {
    AdsArea.find({ nguoi_tao: req.user.username }, function (err, adsArea) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(adsArea);
        }
    });
};

exports.read_a_adsArea_by_adsAreaId = function (req, res) {
    var username = req.user.username;
    AdsArea.findOne({ ma_dich_vu: req.params.adsAreaId, nguoi_tao: username }, function (err, adsArea) {
        if (err)
            res.send(err);
        res.json(adsArea);
    });
};

exports.get_a_adsArea_by_adsAreaIdAndCreator = function (adsareaId, creator, next) {
    AdsArea.findOne({ ma_dich_vu: adsareaId, nguoi_tao: creator }, function (err, adsArea) {
        if (err)
            next(null);
        next(adsArea);
    });
};

exports.read_adsArea_Info = function (req, res) {
    AdsArea.find({ nguoi_tao: req.user.username }, function (err, adsAreas) {
        if (err) {
            res.send(err);
        }
        else {
            var adsareaIdInfo = adsAreas.map((adsArea) =>
                _.pick(adsArea, ['_id', 'ma_dich_vu', 'ten_hien_thi', 'loai_trang_ap_dung', 'loai_quang_cao'])
            );
            res.json(adsareaIdInfo);
        }
    });
};

exports.read_adsArea_infos_by_username = function (username, next) {
    AdsArea.find({ nguoi_tao: username }, function (err, adsAreas) {
        if (err) {
            next(null);
        }
        else {
            let adsareaIdInfo = adsAreas.map((adsArea) => {
                return _.pick(adsArea, ['_id', 'ma_dich_vu', 'ten_hien_thi', 'loai_trang_ap_dung', 'loai_quang_cao', 'tin_rao_api', 'so_luong_chia_se_vung', 'so_luong_tin_toi_da']);
            });
            next(adsareaIdInfo);
        }
    });
};

exports.create_a_adsArea = function (req, res) {
    var creator = req.user.username;
    var new_adsArea = new AdsArea(req.body);
    new_adsArea.nguoi_tao = creator;
    new_adsArea.trang_thai = 1;

    new_adsArea.save(function (err, adsArea) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(adsArea);
        }
    });
};

exports.read_a_adsArea = function (req, res) {
    AdsArea.findById(req.params.adsAreaId, function (err, adsArea) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(adsArea);
        }
    });
};

exports.update_a_adsArea = function (req, res) {
    AdsArea.findOneAndUpdate({ _id: req.params.adsAreaId }, req.body, { new: true }, function (err, adsArea) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(adsArea);
        }
    });
};


exports.delete_a_adsArea = function (req, res) {
    AdsArea.remove({
        _id: req.params.adsAreaId
    }, function (err, adsArea) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ message: 'successfully deleted' });
        }
    });
};

exports.read_list_adsArea_by_appliedPageAndUsername = function (appliedPage, username, next) {
    AdsArea.find({ "loai_trang_ap_dung.key": appliedPage, nguoi_tao: username }, function (err, adsAreas) {
        if (err) {
            next(null);
        }
        else {
            next(adsAreas);
        }
    });
};