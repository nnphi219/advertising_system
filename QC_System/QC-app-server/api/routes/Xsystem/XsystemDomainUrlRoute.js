'use strict';
var {  authenticate } = require('../../../middleware/authenticate');

module.exports = function(app) {
    var xsystemDomainUrlController = require('../../controllers/Xsystem/XsystemDomainUrlController');

    app.route('/XsystemDomainUrls')
        .get(authenticate, xsystemDomainUrlController.list_all_domain_urls)
        .post(authenticate, xsystemDomainUrlController.create_a_domainUrl);

    app.route('/XsystemDomainUrls/:domainUrlId')
        .get(authenticate, xsystemDomainUrlController.read_a_domainUrl)
        .put(authenticate, xsystemDomainUrlController.update_a_domainUrl)
        .delete(authenticate, xsystemDomainUrlController.delete_a_domainUrl);
};