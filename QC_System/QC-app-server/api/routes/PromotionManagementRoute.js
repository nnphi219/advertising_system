'use strict';
module.exports = function(app) {
    var promotionManagementController = require('../controllers/PromotionManagementController');

    app.route('/promotionManagements')
        .get(promotionManagementController.list_all_promotionManagement)
        .post(promotionManagementController.create_a_promotionManagement);

    app.route('/promotionManagements/:promotionManagementId')
        .get(promotionManagementController.read_a_promotionManagement)
        .put(promotionManagementController.update_a_promotionManagement)
        .delete(promotionManagementController.delete_a_promotionManagement);
};