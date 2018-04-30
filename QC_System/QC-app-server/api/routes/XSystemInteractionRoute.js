'use strict';
var { authenticate } = require('../../middleware/authenticate');

module.exports = function (app) {
    var xsystemController = require('../controllers/XSystemInteractionController');

    app.route('/getInfosByUserName')
        .get(xsystemController.read_Infos_ByUsername);
};