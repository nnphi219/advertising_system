'use strict';
const _ = require('lodash');

var mongoose = require('mongoose'),
    AdsArea = mongoose.model('AdsAreas'),
    User = mongoose.model('Users');

var userController = require('./UserController');
var adsAreaController = require('./AdsAreaController');

exports.read_Infos_ByUsername = (req, res) => {
    var username = req.header('Username');

    var user = userController.read_a_user_by_username(username, function(user){
        if (user) {
            var jsonInfosByUsername = {
                user: user
            };
            
            adsAreaController.read_adsArea_infos_by_username(user.username, function(adsAreaInfos){
                if(adsAreaInfos !== null) {
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