'use strict';

var DateFormat = require('../../share/DateFormat');

var mongoose = require('mongoose'),
    PostCampaignManagement = mongoose.model('PostCampaigns');

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
    new_postCampaignManagement.trang_thai = 1;

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

exports.read_list_postCampaign_by_listadsAreaIdsAndXAdminUsername = function (adsAreaIds, x_admin_username, next) {
    let dateNow = new Date();
    let day = dateNow.getDate();
    let month = dateNow.getMonth() + 1;
    let year = dateNow.getFullYear();

    let jsonDateNow = {
        day, month, year
    };

    let hours = dateNow.getHours();
    let minutes = dateNow.getMinutes();

    let conditionFilter = {
        loai_dich_vu: { $in: adsAreaIds }, 
        x_admin_username: x_admin_username,
        'khung_gio_hien_thi.bat_dau': 0
    };

    PostCampaignManagement.find(conditionFilter, function (err, postCampaigns) {
        if (err) {
            next(null);
        }
        else {
            var filteredTimePostCampaigns = postCampaigns.filter((postCampaign) => {
                return DateFormat.JsonDate2GreaterThanOrEqualJsonDate1(postCampaign.ngay_bat_dau, jsonDateNow) 
                        && DateFormat.JsonDate2GreaterThanOrEqualJsonDate1(jsonDateNow, postCampaign.ngay_ket_thuc);
            });

            next(filteredTimePostCampaigns);
        }
    });
};