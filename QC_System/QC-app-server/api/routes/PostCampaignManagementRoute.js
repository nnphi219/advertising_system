'use strict';
module.exports = function(app) {
    var postCampaignManagementController = require('../controllers/PostCampaignManagementController');

    app.route('/postCampaignManagements')
        .get(postCampaignManagementController.list_all_postCampaignManagement)
        .post(postCampaignManagementController.create_a_postCampaignManagement);

    app.route('/postCampaignManagements/:postCampaignManagementId')
        .get(postCampaignManagementController.read_a_postCampaignManagement)
        .put(postCampaignManagementController.update_a_postCampaignManagement)
        .delete(postCampaignManagementController.delete_a_postCampaignManagement);
};