'use strict';
var { authenticate } = require('../../middleware/authenticate');

module.exports = function (app) {
    var xsystemController = require('../controllers/XSystemInteractionController');

    app.route('/getInfosByUserName')
        .get(xsystemController.read_Infos_ByUsername);

    app.route('/getServicePriceByAreaIdAndDisplayMode')
        .get(xsystemController.get_serviceprice_ByAreaIdAndDisplayMode);

    app.route('/priceFactorCalculateTotalAffectValue')
        .post(xsystemController.calculate_total_affect_value)
};