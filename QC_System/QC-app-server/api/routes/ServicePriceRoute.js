'use strict';
var { authenticate } = require('../../middleware/authenticate');

module.exports = function (app) {
    var servicePriceController = require('../controllers/ServicePriceController');

    app.route('/servicePrices')
        .get(authenticate, servicePriceController.list_all_servicePrice)
        .post(authenticate, servicePriceController.create_a_servicePrice);

    app.route('/servicePrices/:servicePriceId')
        .get(authenticate, servicePriceController.read_a_servicePrice)
        .put(authenticate, servicePriceController.update_a_servicePrice)
        .delete(authenticate, servicePriceController.delete_a_servicePrice);

    app.route('/getservicePricesIdInfo')
        .get(authenticate, servicePriceController.read_servicePriceId_Info);

    app.route('/servicePrices/check/:servicePriceId')
        .get(authenticate, servicePriceController.read_a_servicePrice_by_servicePriceId);
};