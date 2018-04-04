'use strict';
module.exports = function (app) {
    var servicePriceController = require('../controllers/ServicePriceController');

    app.route('/servicePrices')
        .get(servicePriceController.list_all_servicePrice)
        .post(servicePriceController.create_a_servicePrice);

    app.route('/servicePrices/:servicePriceId')
        .get(servicePriceController.read_a_servicePrice)
        .put(servicePriceController.update_a_servicePrice)
        .delete(servicePriceController.delete_a_servicePrice);

    app.route('/getservicePricesIdInfo')
        .get(servicePriceController.read_servicePriceId_Info);
};