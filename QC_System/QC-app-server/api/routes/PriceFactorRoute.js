'use strict';
var { authenticate } = require('../../middleware/authenticate');

module.exports = function (app) {
    var priceFactorController = require('../controllers/PriceFactorController');

    app.route('/priceFactors')
        .get(authenticate, priceFactorController.list_all_priceFactor)
        .post(authenticate, priceFactorController.create_a_priceFactor);

    app.route('/priceFactors/:priceFactorId')
        .get(authenticate, priceFactorController.read_a_priceFactor)
        .put(authenticate, priceFactorController.update_a_priceFactor)
        .delete(authenticate, priceFactorController.delete_a_priceFactor);

    app.route('/priceFactors/check/:priceFactorId')
        .get(authenticate, priceFactorController.read_a_priceFactor_by_priceFactorId);
};