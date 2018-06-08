'use strict';

var mongoose = require('mongoose'),
    PriceFactor = mongoose.model('PriceFactors');

function GetSelectedTimeSlots(body, next) {
    var array_khung_gio_bat_dau = body.loai_nhan_to.khung_gio.bat_dau;
    var array_khung_gio_ket_thuc = body.loai_nhan_to.khung_gio.ket_thuc;

    if(typeof(array_khung_gio_bat_dau) == 'string'){
        array_khung_gio_bat_dau = [array_khung_gio_bat_dau];
        array_khung_gio_ket_thuc = [array_khung_gio_ket_thuc];
    }

    var khung_gio = [];

    array_khung_gio_bat_dau.forEach((bat_dau, index) => {
        khung_gio.push({
            bat_dau: bat_dau,
            ket_thuc: array_khung_gio_ket_thuc[index]
        });
    });

    next(khung_gio);
};

exports.list_all_priceFactor = function (req, res) {
    PriceFactor.find({ nguoi_tao: req.user.username }, function (err, priceFactors) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(priceFactors);
        }
    });
};

exports.read_a_priceFactor_by_priceFactorId = (req, res) => {
    var username = req.user.username;
    PriceFactor.findOne({ ma_chi_so: req.params.priceFactorId, nguoi_tao: username }, function (err, priceFactor) {
        if (err)
            res.send(err);
        res.json(priceFactor);
    });
};

exports.read_all_priceFactor_by_servicePriceIdAndDate = (servicePriceId, creator, next) => {
    PriceFactor.find({ nguoi_tao: creator, ma_gia: servicePriceId }, function (err, priceFactors) {
        if (err)
            next([]);
        next(priceFactors);
    });
};

exports.create_a_priceFactor = function (req, res) {
    GetSelectedTimeSlots(req.body, function (khung_gio) {
        var new_priceFactor = new PriceFactor(req.body);
        new_priceFactor.loai_nhan_to.khung_gio = khung_gio;
        new_priceFactor.nguoi_tao = req.user.username;
        new_priceFactor.trang_thai = 1;

        new_priceFactor.save(function (err, priceFactor) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(priceFactor);
            }
        });
    });
};

exports.read_a_priceFactor = function (req, res) {
    PriceFactor.findById(req.params.priceFactorId, function (err, priceFactor) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(priceFactor);
        }
    });
};

exports.update_a_priceFactor = function (req, res) {
    GetSelectedTimeSlots(req.body, function (khung_gio) {
        req.body.loai_nhan_to.khung_gio = khung_gio;
        PriceFactor.findOneAndUpdate({ _id: req.params.priceFactorId }, req.body, { new: true }, function (err, priceFactor) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(priceFactor);
            }
        });
    });
};

exports.update_a_priceFactor_without_timeSlots = function(req, res) {
    PriceFactor.findOneAndUpdate({_id: req.params.priceFactorId}, req.body, {new: true}, function(err, priceFactor) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(priceFactor);
        }
    });
  };

exports.delete_a_priceFactor = function (req, res) {
    PriceFactor.remove({
        _id: req.params.priceFactorId
    }, function (err, priceFactor) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ message: 'successfully deleted' });
        }
    });
};

