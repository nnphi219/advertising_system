'use strict';

var mongoose = require('mongoose'),
    ServicePrice = mongoose.model('ServicePrices');

exports.list_all_servicePrice = function(req, res) {
    ServicePrice.find({}, function(err, servicePrice) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(servicePrice);
        }
    });
};

exports.create_a_servicePrice = function(req, res) {
    var new_servicePrice = new ServicePrice(req.body);
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