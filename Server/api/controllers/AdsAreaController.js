'use strict';

var mongoose = require('mongoose'),
    AdsArea = mongoose.model('AdsAreas');

exports.list_all_adsAreas = function(req, res) {
    AdsArea.find({}, function(err, adsArea) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(adsArea);
        }
    });
};

exports.create_a_adsArea = function(req, res) {
    var new_adsArea = new AdsArea(req.body);
    new_adsArea.save(function(err, adsArea) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(adsArea);
        }
    });
  };
  
  
  exports.read_a_adsArea = function(req, res) {
    AdsArea.findById(req.params.adsAreaId, function(err, adsArea) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(adsArea);
        }
    });
  };
  
  
  exports.update_a_adsArea = function(req, res) {
    AdsArea.findOneAndUpdate({_id: req.params.adsAreaId}, req.body, {new: true}, function(err, adsArea) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(adsArea);
        }
    });
  };
  
  
  exports.delete_a_adsArea = function(req, res) {
    AdsArea.remove({
      _id: req.params.adsAreaId
    }, function(err, adsArea) {
      if (err) {
        res.send(err);
      }
      else {
        res.json({ message: 'Advertising area successfully deleted' });
      }
    });
  };