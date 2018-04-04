'use strict';
const _ = require('lodash');

var mongoose = require('mongoose'),
    PromotionManagement = mongoose.model('PromotionManagements');

exports.list_all_promotionManagement = function(req, res) {
    PromotionManagement.find({}, function(err, promotionManagement) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(promotionManagement);
        }
    });
};

exports.read_PromotionId_Info = function (req, res) {
    PromotionManagement.find({}, function (err, promotions) {
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

exports.create_a_promotionManagement = function(req, res) {
    var new_promotionManagement = new PromotionManagement(req.body);
    new_promotionManagement.save(function(err, promotionManagement) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(promotionManagement);
        }
    });
  };
  
  
  exports.read_a_promotionManagement = function(req, res) {
    PromotionManagement.findById(req.params.promotionManagementId, function(err, promotionManagement) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(promotionManagement);
        }
    });
  };
  
  
  exports.update_a_promotionManagement = function(req, res) {
    PromotionManagement.findOneAndUpdate({_id: req.params.promotionManagementId}, req.body, {new: true}, function(err, promotionManagement) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(promotionManagement);
        }
    });
  };
  
  
  exports.delete_a_promotionManagement = function(req, res) {
    PromotionManagement.remove({
      _id: req.params.promotionManagementId
    }, function(err, promotionManagement) {
      if (err) {
        res.send(err);
      }
      else {
        res.json({ message: 'successfully deleted' });
      }
    });
  };