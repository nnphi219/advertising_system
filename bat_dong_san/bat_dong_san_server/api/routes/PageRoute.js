'use strict';
var { authenticateAdmin } = require('../../middleware/authenticate');

module.exports = function (app) {
    var pageList = require('../controllers/PageController');

    app.route('/pages')
        .get(authenticateAdmin, pageList.list_all_pages)
        .post(authenticateAdmin, pageList.create_a_page);

    app.route('/pages/:pageId')
        .get(authenticateAdmin, pageList.read_a_page)
        .put(authenticateAdmin, pageList.update_a_page)
        .delete(authenticateAdmin, pageList.delete_a_page);

    app.route('/pages/check/:pageId')
        .get(authenticateAdmin, pageList.read_a_page_by_PageId);

    app.route('/getPages')
        .get(pageList.list_all_pages_for_qc);
};