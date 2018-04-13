'use strict';

var mongoose = require('mongoose'),
    Page = mongoose.model('Pages');

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
    var new_page = new Page(req.body);
    new_page.save(function (err, page) {
        if (err)
            res.send(err);
        res.json(page);
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
    Page.findOneAndUpdate({ _id: req.params.pageId }, req.body, { new: true }, function (err, page) {
        if (err)
            res.send(err);
        res.json(page);
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