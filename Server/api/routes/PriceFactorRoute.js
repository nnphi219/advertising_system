'use strict';
module.exports = function(app) {
    var priceFactorController = require('../controllers/PriceFactorController');

    app.route('/priceFactors')
        .get(priceFactorController.list_all_priceFactor)
        .post(priceFactorController.create_a_priceFactor);

    app.route('/priceFactors/:priceFactorId')
        .get(priceFactorController.read_a_priceFactor)
        .put(priceFactorController.update_a_priceFactor)
        .delete(priceFactorController.delete_a_priceFactor);
};