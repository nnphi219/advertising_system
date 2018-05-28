'use strict';
var { authenticate } = require('../../middleware/authenticate');

module.exports = function (app) {
    var xsystemController = require('../controllers/XSystemInteractionController');

    app.route('/getInfosByUserName')
        .get(xsystemController.read_Infos_ByUsername);

    app.route('/getServicePriceByAreaIdAndDisplayMode')
        .get(xsystemController.get_serviceprice_ByAreaIdAndDisplayMode);

    app.route('/GetPromotionByPromotionCodeAndUsername')
        .get(xsystemController.get_promotion_by_promotionCodeAndUsername);

    app.route('/priceFactorCalculateTotalAffectValue')
        .post(xsystemController.calculate_total_affect_value)

    app.route('/postCampaignforXsystem')
        .post(xsystemController.create_a_postCampaign_from_xsystemUser)

    app.route('/getAvailableTimeSlot')
        .post(xsystemController.get_available_time_slot)

    app.route('/GetPostsBasicOnAppliedPageAndXAdminUsername')
        .post(xsystemController.get_posts_basic_on_applied_page)
};