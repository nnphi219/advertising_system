'use strict';
const _ = require('lodash');

var mongoose = require('mongoose'),
    PromotionManagement = mongoose.model('promotions');

exports.list_all_promotionManagement = function (req, res) {
    PromotionManagement.find({ nguoi_tao: req.user.username }, function (err, promotionManagement) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(promotionManagement);
        }
    });
};

exports.read_a_promotion_by_promotionId = function (req, res) {
    var username = req.user.username;
    PromotionManagement.findOne({ ma_khuyen_mai: req.params.promotionManagementId, nguoi_tao: username }, function (err, promotion) {
        if (err)
            res.send(err);
        res.json(promotion);
    });
};

exports.read_PromotionId_Info = function (req, res) {
    PromotionManagement.find({ nguoi_tao: req.user.username }, function (err, promotions) {
        if (err) {
            res.send(err);
        }
        else {
            var promotionsIdInfo = promotions.map((promotion) =>
                _.pick(promotion, ['_id', 'ma_khuyen_mai', 'mo_ta'])
            );
            res.json(promotionsIdInfo);
        }
    });
};

exports.create_a_promotionManagement = function (req, res) {
    var new_promotionManagement = new PromotionManagement(req.body);
    new_promotionManagement.nguoi_tao = req.user.username;
    new_promotionManagement.trang_thai = 1;

    new_promotionManagement.save(function (err, promotionManagement) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(promotionManagement);
        }
    });
};


exports.read_a_promotionManagement = function (req, res) {
    PromotionManagement.findById(req.params.promotionManagementId, function (err, promotionManagement) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(promotionManagement);
        }
    });
};


exports.update_a_promotionManagement = function (req, res) {
    PromotionManagement.findOneAndUpdate({ _id: req.params.promotionManagementId }, req.body, { new: true }, function (err, promotionManagement) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(promotionManagement);
        }
    });
};


exports.delete_a_promotionManagement = function (req, res) {
    PromotionManagement.remove({
        _id: req.params.promotionManagementId
    }, function (err, promotionManagement) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ message: 'successfully deleted' });
        }
    });
};

exports.get_a_promotion_by_CodeAndUsername = function (code, creator, next) {
    PromotionManagement.findOne({ nguoi_tao: creator, code: code }, function (err, promotion) {
        if (err)
            next(null);
        next(promotion);
    });
}