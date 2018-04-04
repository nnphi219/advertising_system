'use strict';

var mongoose = require('mongoose'),
    PostCampaignManagement = mongoose.model('PostCampaignManagements');

exports.list_all_postCampaignManagement = function (req, res) {
    PostCampaignManagement.find({}, function (err, postCampaignManagement) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(postCampaignManagement);
        }
    });
};

exports.create_a_postCampaignManagement = function (req, res) {
    var new_postCampaignManagement = new PostCampaignManagement(req.body);
    new_postCampaignManagement.save(function (err, postCampaignManagement) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(postCampaignManagement);
        }
    });
};


exports.read_a_postCampaignManagement = function (req, res) {
    PostCampaignManagement.findById(req.params.postCampaignManagementId, function (err, postCampaignManagement) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(postCampaignManagement);
        }
    });
};


exports.update_a_postCampaignManagement = function (req, res) {
    PostCampaignManagement.findOneAndUpdate({ _id: req.params.postCampaignManagementId }, req.body, { new: true }, function (err, postCampaignManagement) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(postCampaignManagement);
        }
    });
};


exports.delete_a_postCampaignManagement = function (req, res) {
    PostCampaignManagement.remove({
        _id: req.params.postCampaignManagementId
    }, function (err, postCampaignManagement) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ message: 'successfully deleted' });
        }
    });
};