'use strict';

const request = require('superagent');

var mapper = require('../../share/Mapper');
var dateFormat = require('../../share/DateFormat');
var commonFunction = require('../../share/CommonFunction');

const _ = require('lodash');

var mongoose = require('mongoose'),
    AdsArea = mongoose.model('AdsAreas'),
    User = mongoose.model('Users'),
    PostCampaign = mongoose.model('PostCampaigns');


var userController = require('./UserController');
var adsAreaController = require('./AdsAreaController');
var servicePriceController = require('./ServicePriceController');
var priceFactorController = require('./PriceFactorController');
var promotionController = require('./PromotionManagementController');

function GetSelectedTimeSlotsArrayJson(selectedTimeSlots, next) {
    let array_khung_gio_bat_dau = selectedTimeSlots.bat_dau.slice();
    let array_khung_gio_ket_thuc = selectedTimeSlots.ket_thuc.slice();
    let array_khung_gio = [];

    array_khung_gio_bat_dau.forEach((bat_dau, index) => {
        let timeSlot = {
            bat_dau: bat_dau,
            ket_thuc: array_khung_gio_ket_thuc[index]
        };
        array_khung_gio.push(timeSlot);
    });

    next(array_khung_gio);
};

exports.read_Infos_ByUsername = (req, res) => {
    var username = req.header('Username');

    var user = userController.read_a_user_by_username(username, function (user) {
        if (user) {
            var jsonInfosByUsername = {
                user: user
            };

            adsAreaController.read_adsArea_infos_by_username(user.username, function (adsAreaInfos) {
                if (adsAreaInfos !== null) {
                    jsonInfosByUsername.adsAreaInfos = adsAreaInfos;
                }
                res.json(jsonInfosByUsername);
            });
        }
        else {
            res.status(404).send();
        }
    });
};

exports.get_serviceprice_ByAreaIdAndDisplayMode = (req, res) => {
    var adsareaId = req.header('adsareaId');
    var displayModeKey = req.header('displayMode');
    var nguoitao = req.header('Username');
    var XSystemToken = req.header('xsystem-auth');

    servicePriceController.get_a_serviceprice_by_adsAreaIdAndCreator(adsareaId, displayModeKey, nguoitao, function (servicePrice) {
        res.json(servicePrice);
    });
};

exports.get_promotion_by_promotionCodeAndUsername = (req, res) => {
    var promotionCode = req.header('promotioncode');
    var creator = req.header('username');

    promotionController.get_a_promotion_by_CodeAndUsername(promotionCode, creator, function (promotion) {
        res.json(promotion);
    });
};

exports.calculate_total_affect_value = (req, res) => {
    var content = req.body;

    var appliedServicePriceId = content.appliedServicePriceId;

    var location = content.vi_tri;
    var jsonStartDate = content.start_date;
    var jsonEndDate = content.end_date;


    var nguoitao = content.Username;
    var XSystemToken = content['xsystem-auth'];

    var total_affect_value = 0;

    var selectedTimeSlots = {
        bat_dau: [],
        ket_thuc: []
    };
    if (content.selectedTimeSlots !== undefined) {
        selectedTimeSlots = content.selectedTimeSlots;
        if (typeof (selectedTimeSlots.bat_dau) === "string") {
            var refactorSelectedTimeSlots = {
                bat_dau: [selectedTimeSlots.bat_dau],
                ket_thuc: [selectedTimeSlots.ket_thuc]
            }

            selectedTimeSlots = refactorSelectedTimeSlots;
        }
    }

    GetSelectedTimeSlotsArrayJson(selectedTimeSlots, function (selectedTimeSlotJsons) {

        priceFactorController.read_all_priceFactor_by_servicePriceIdAndDate(appliedServicePriceId, nguoitao, function (priceFactors) {
            priceFactors.forEach(priceFactor => {
                let finishLoop = false;
                let jsonDateInLoop = jsonStartDate;

                while (!finishLoop) {
                    if (dateFormat.JsonDateIsInTheMiddleOfTime(jsonDateInLoop, priceFactor.start_date, priceFactor.end_date)) {
                        var priceFactor_timeSlots = priceFactor.loai_nhan_to.khung_gio;
                        selectedTimeSlotJsons.forEach((timeSlot) => {

                            if (commonFunction.CheckArrayTimeSlotsContainsElement(priceFactor_timeSlots, timeSlot)) {
                                total_affect_value += priceFactor.gia_tri_thuc_tang_them;
                            }
                        });
                    }

                    var dateInLoop = mapper.JsonDateToDate(jsonDateInLoop);
                    dateInLoop.setDate(dateInLoop.getDate() + 1);
                    jsonDateInLoop = mapper.DateToJsonDate(dateInLoop);

                    if (!dateFormat.JsonDate2GreaterThanOrEqualJsonDate1(jsonDateInLoop, jsonEndDate)) {
                        finishLoop = true;
                    }
                }
            });

            var jsonRes = {
                total_affect_value
            };

            res.json(jsonRes);
        });
    });
};

exports.create_a_postCampaign_from_xsystemUser = function (req, res) {
    var content = req.body;
    var x_user_accessToken = content.x_user_accessToken;

    request.get('http://localhost:8081/checkXUserauthenticate')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('xsystem-auth', x_user_accessToken)
        .then((responseXAuth) => {
            var jsonResult = null;
            if (responseXAuth.body) {
                var x_user_specific_info = responseXAuth.body.x_user_specific_info;

                GetSelectedTimeSlotsArrayJson(content.khung_gio_hien_thi, function (arrayJsonTimeSlots) {
                    var newPostCampaign = new PostCampaign(content);
                    newPostCampaign.khung_gio_hien_thi = arrayJsonTimeSlots;
                    newPostCampaign.x_user_specific_info = x_user_specific_info;

                    newPostCampaign.save(function (err, resPostCampaign) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.json(resPostCampaign);
                        }
                    });
                });
            }
        });
};