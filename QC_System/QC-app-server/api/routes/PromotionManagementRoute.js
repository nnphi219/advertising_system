'use strict';
var { authenticate } = require('../../middleware/authenticate');

module.exports = function (app) {
    var promotionManagementController = require('../controllers/PromotionManagementController');

    app.route('/promotionManagements')
        .get(authenticate, promotionManagementController.list_all_promotionManagement)
        .post(authenticate, promotionManagementController.create_a_promotionManagement);

    app.route('/promotionManagements/:promotionManagementId')
        .get(authenticate, promotionManagementController.read_a_promotionManagement)
        .put(authenticate, promotionManagementController.update_a_promotionManagement)
        .delete(authenticate, promotionManagementController.delete_a_promotionManagement);

    app.route('/getPromotionsIdInfo')
        .get(authenticate, promotionManagementController.read_PromotionId_Info);

    app.route('/promotionManagements/check/:promotionManagementId')
        .get(authenticate, promotionManagementController.read_a_promotion_by_promotionId);
};