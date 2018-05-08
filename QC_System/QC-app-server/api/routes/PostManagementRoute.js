'use strict';
module.exports = function(app) {
    var postManagementController = require('../controllers/PostManagementController');

    app.route('/postManagement')
        .get(postManagementController.list_all_postManagement)
        .post(postManagementController.create_a_postManagement);

    app.route('/postManagement/:postManagementId')
        .get(postManagementController.read_a_postManagement)
        .put(postManagementController.update_a_postManagement)
        .delete(postManagementController.delete_a_postManagement);

    app.route('/uploads')
        .post(postManagementController.persist_a_file);
};