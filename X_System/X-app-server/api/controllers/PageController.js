'use strict';

var mongoose = require('mongoose'),
    Page = mongoose.model('Pages');

function GetAddedAdsAreas(adsAreas, next) {
    if (adsAreas) {
        var array_adsAreaIds = adsAreas.ma_vung;
        var array_adsAreaNames = adsAreas.ten_vung;
        if(typeof(array_adsAreaIds) == 'string'){
            array_adsAreaIds = [adsAreas.ma_vung];
            array_adsAreaNames = [adsAreas.ten_vung];
        }

        var arrayJsonAdsAreas = [];

        array_adsAreaIds.forEach((id, index) => {
            arrayJsonAdsAreas.push({
                ma_vung: id,
                ten_vung: array_adsAreaNames[index]
            });
        });

        next(arrayJsonAdsAreas);
    }
    else{
        next([]);
    }


};

exports.list_all_pages = function (req, res) {
    Page.find({}, function (err, page) {
        if (err)
            res.send(err);
        res.json(page);
    });
};

exports.list_all_pages_for_qc = function (req, res) {
    Page.find({}, function (err, pages) {
        if (err)
            res.send(err);

        var pages_for_qc = pages.map((page) => {
            return {
                ma_trang_quang_cao: page.ma_trang_quang_cao,
                ten_trang_quang_cao: page.ten_trang_quang_cao
            }
        });

        res.json(pages_for_qc);
    });
};

exports.create_a_page = function (req, res) {
    var content = req.body;

    GetAddedAdsAreas(content.vung_quang_cao, function (arrayJsonAdsArea) {
        content.vung_quang_cao = arrayJsonAdsArea;

        var new_page = new Page(content);
        new_page.save(function (err, page) {
            if (err)
                res.send(err);
            res.json(page);
        });
    });
};


exports.read_a_page = function (req, res) {
    Page.findById(req.params.pageId, function (err, page) {
        if (err)
            res.send(err);
        res.json(page);
    });
};

exports.read_a_page_by_PageId = function (req, res) {
    Page.findOne({ ma_trang_quang_cao: req.params.pageId }, function (err, page) {
        if (err)
            res.send(err);
        res.json(page);
    });
};

exports.update_a_page = function (req, res) {
    var content = req.body;
    console.log(content.vung_quang_cao);
    
    GetAddedAdsAreas(content.vung_quang_cao, function (arrayJsonAdsArea) {
        content.vung_quang_cao = arrayJsonAdsArea;

        Page.findOneAndUpdate({ _id: req.params.pageId }, content, { new: true }, function (err, page) {
            if (err)
                res.send(err);
            res.json(page);
        });
    });


};


exports.delete_a_page = function (req, res) {
    Page.remove({
        _id: req.params.pageId
    }, function (err, page) {
        if (err)
            res.send(err);
        res.json({ message: 'page successfully deleted' });
    });
};