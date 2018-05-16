'use strict';
var {  authenticate } = require('../../../middleware/authenticate');

module.exports = function(app) {
    var xsystemApiUrlController = require('../../controllers/Xsystem/XsystemApiUrlController');

    app.route('/XsystemApiUrls')
        .get(authenticate, xsystemApiUrlController.list_all_api_urls)
        .post(authenticate, xsystemApiUrlController.create_a_apiUrl);

    app.route('/XsystemApiUrls/:apiUrlId')
        .get(authenticate, xsystemApiUrlController.read_a_apiUrl)
        .put(authenticate, xsystemApiUrlController.update_a_apiUrl)
        .delete(authenticate, xsystemApiUrlController.delete_a_apiUrl);
};