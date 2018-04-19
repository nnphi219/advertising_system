'use strict';

var mongoose = require('mongoose'),
    PriceFactor = mongoose.model('PriceFactors');

exports.list_all_priceFactor = function(req, res) {
    PriceFactor.find({}, function(err, priceFactor) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(priceFactor);
        }
    });
};

exports.create_a_priceFactor = function(req, res) {
    var new_priceFactor = new PriceFactor(req.body);
    new_priceFactor.trang_thai = 1;
    
    new_priceFactor.save(function(err, priceFactor) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(priceFactor);
        }
    });
  };
  
  
  exports.read_a_priceFactor = function(req, res) {
    PriceFactor.findById(req.params.priceFactorId, function(err, priceFactor) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(priceFactor);
        }
    });
  };
  
  
  exports.update_a_priceFactor = function(req, res) {
    PriceFactor.findOneAndUpdate({_id: req.params.priceFactorId}, req.body, {new: true}, function(err, priceFactor) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(priceFactor);
        }
    });
  };
  
  
  exports.delete_a_priceFactor = function(req, res) {
    PriceFactor.remove({
      _id: req.params.priceFactorId
    }, function(err, priceFactor) {
      if (err) {
        res.send(err);
      }
      else {
        res.json({ message: 'successfully deleted' });
      }
    });
  };