'use strict';
var { authenticate } = require('../../../middleware/authenticate');

module.exports = function (app) {
    var xsystemPageList = require('../../controllers/Xsystem/XsystemPageController');

    app.route('/xsystemPages')
        .get(authenticate, xsystemPageList.list_all_xsystem_pages)
        .post(authenticate, xsystemPageList.create_a_xsystem_page);

    app.route('/xsystemPages/:pageId')
        .get(authenticate, xsystemPageList.read_a_xsystem_page)
        .put(authenticate, xsystemPageList.update_a_xsystem_page)
        .delete(authenticate, xsystemPageList.delete_a_xsystem_page);

    app.route('/xsystemPages/check/:pageId')
        .get(authenticate, xsystemPageList.read_a_xsystem_page_by_pageId);

    app.route('/getXsystemPages')
        .get(xsystemPageList.list_all_xsystem_pages_for_qc);
};