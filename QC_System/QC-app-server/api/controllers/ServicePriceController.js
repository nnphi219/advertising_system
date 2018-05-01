'use strict';
const _ = require('lodash');

var mongoose = require('mongoose'),
    ServicePrice = mongoose.model('ServicePrices');

exports.list_all_servicePrice = function(req, res) {
    ServicePrice.find({nguoi_tao: req.user.username}, function(err, servicePrice) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(servicePrice);
        }
    });
};

exports.read_a_servicePrice_by_servicePriceId = (req, res) => {
    var username = req.user.username;
    ServicePrice.findOne({ ma_gia: req.params.servicePriceId, nguoi_tao: username }, function (err, servicePrice) {
        if (err)
            res.send(err);
        res.json(servicePrice);
    });
};

exports.get_a_serviceprice_by_adsAreaIdAndCreator = function (adsareaId, displayModeKey, creator, next) {
    ServicePrice.findOne({ ma_dich_vu_ap_dung: adsareaId, 'loai_co_che.key': displayModeKey, nguoi_tao: creator }, function (err, servicePrice) {
        if (err)
            next(null);
        next(servicePrice);
    });
};

exports.read_servicePriceId_Info = function (req, res) {
    ServicePrice.find({nguoi_tao: req.user.username}, function (err, servicePrices) {
        if (err) {
            res.send(err);
        }
        else {
            var servicePricesIdInfo = servicePrices.map((servicePrice) =>
             _.pick(servicePrice, ['_id', 'ma_gia', 'loai_co_che', 'gia_tri'])
            );
            res.json(servicePricesIdInfo);
        }
    });
};

exports.create_a_servicePrice = function(req, res) {
    var new_servicePrice = new ServicePrice(req.body);
    new_servicePrice.nguoi_tao = req.user.username;
    new_servicePrice.trang_thai = 1;
    
    new_servicePrice.save(function(err, servicePrice) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(servicePrice);
        }
    });
  };
  
  
  exports.read_a_servicePrice = function(req, res) {
    ServicePrice.findById(req.params.servicePriceId, function(err, servicePrice) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(servicePrice);
        }
    });
  };
  
  
  exports.update_a_servicePrice = function(req, res) {
    ServicePrice.findOneAndUpdate({_id: req.params.servicePriceId}, req.body, {new: true}, function(err, servicePrice) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(servicePrice);
        }
    });
  };
  
  
  exports.delete_a_servicePrice = function(req, res) {
    ServicePrice.remove({
      _id: req.params.servicePriceId
    }, function(err, servicePrice) {
      if (err) {
        res.send(err);
      }
      else {
        res.json({ message: 'successfully deleted' });
      }
    });
  };