'use strict';

const request = require('superagent');

var mapper = require('../../share/Mapper');
var dateFormat = require('../../share/DateFormat');
var commonFunction = require('../../share/CommonFunction');
var Promise = require('promise');

var {BANNER} = require('../../share/constants');

var { authenticate } = require('../../middleware/authenticate');

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
var postCampaignController = require('./PostCampaignManagementController');

function GetSelectedTimeSlotsArrayJson(selectedTimeSlots, next) {
    let array_khung_gio_bat_dau = selectedTimeSlots.bat_dau.slice();
    let array_khung_gio_ket_thuc = selectedTimeSlots.ket_thuc.slice();

    if (typeof (array_khung_gio_bat_dau) == 'string') {
        array_khung_gio_bat_dau = [array_khung_gio_bat_dau];
        array_khung_gio_ket_thuc = [array_khung_gio_ket_thuc];
    }

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

/* Ham chuyen danh sach khung gio hien thi sang danh sach so
Vi du
Input:
[ { bat_dau: 0, ket_thuc: 1, _id: 5aec94eb97c3d621a812cbbd },
  { bat_dau: 1, ket_thuc: 2, _id: 5aec94eb97c3d621a812cbbc },
  { bat_dau: 2, ket_thuc: 3, _id: 5aec94eb97c3d621a812cbbb } ]
Output: [1, 3, 5]
Giai thich: Voi moi khung gio hien thi, lay bat_dau + ket_thuc

*/
function ConvertKhungGioHienThi(khung_gio_hien_thi_list) {
    let ret_list = new Array();
    console.log(khung_gio_hien_thi_list);
    for (let i = 0; i < khung_gio_hien_thi_list.length; i++) {
        let bat_dau = khung_gio_hien_thi_list[i].bat_dau;
        let ket_thuc = khung_gio_hien_thi_list[i].ket_thuc;
        ret_list.push(bat_dau + ket_thuc);
    }
    return ret_list;
}

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

exports.get_posts_basic_on_applied_page = (req, res) => {
    let content = (req.body);
    let trang_ap_dung_id = content.trang_ap_dung_id;
    let x_admin_username = content.x_admin_username;
    let password = content.password;

    // check user
    userController.read_a_user_by_credential(x_admin_username, password, (user) => {
        if (user) {
            //check adsarea by applied page
            adsAreaController.read_list_adsArea_by_appliedPageAndUsername(trang_ap_dung_id, user.username, function (adsAreas) {
                if (adsAreas) {
                    // read all postCampaigns by ads area id, (have no check time slot yet)
                    let adsAreaIds = [];
                    let adsArea_adsTypeKeys = [];
                    let adsArea_appliedAdsAreaKeys = [];

                    adsAreas.forEach((adsArea) => {
                        adsAreaIds.push(adsArea.ma_dich_vu);
                        adsArea_adsTypeKeys.push(adsArea.loai_quang_cao.key);
                        adsArea_appliedAdsAreaKeys.push(adsArea.vung_ap_dung_quang_cao.key);
                    });

                    let resResult = {};
                    postCampaignController.read_list_postCampaign_by_listadsAreaIdsAndXAdminUsername(adsAreaIds, user.username, function (postCampaigns) {
                        postCampaigns.forEach((postCampaign) => {
                            let indexOfAdsArea = adsAreaIds.indexOf(postCampaign.loai_dich_vu);
                            if (indexOfAdsArea > -1) {
                                let adsArea_appliedAdsAreaKey = adsArea_appliedAdsAreaKeys[indexOfAdsArea];
                                let adsArea_adsTypeKey = adsArea_adsTypeKeys[indexOfAdsArea];

                                // create key of json if not exists
                                if (!resResult[adsArea_appliedAdsAreaKey]) {
                                    resResult[adsArea_appliedAdsAreaKey] = {
                                        type: adsArea_adsTypeKey,
                                        contents: []
                                    };
                                }

                                let contentPostCampaign = null;
                                if (adsArea_adsTypeKey === BANNER) {
                                    contentPostCampaign = {
                                        banner_type: 'image',
                                        resource_url: postCampaign.url_image,
                                        link_page_url: postCampaign.url_redirect
                                    };
                                }
                                else {
                                    contentPostCampaign = postCampaign.ma_bai_dang;
                                }
                                resResult[adsArea_appliedAdsAreaKey].contents.push(contentPostCampaign);
                            }
                        });

                        res.json(resResult);
                    });
                }
                else {
                    res.json(null);
                }
            });
        }
        else {
            res.json(null);
        }
    });
};
