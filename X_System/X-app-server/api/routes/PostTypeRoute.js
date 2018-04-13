'use strict';
var {  authenticateAdmin } = require('../../middleware/authenticate');

module.exports = function(app) {
    var postTypeList = require('../controllers/PostTypeController');

    app.route('/postTypes')
        .get(authenticateAdmin, postTypeList.list_all_postTypes)
        .post(authenticateAdmin, postTypeList.create_a_postType);

    app.route('/postTypes/:postTypeId')
        .get(authenticateAdmin, postTypeList.read_a_postType)
        .put(authenticateAdmin, postTypeList.update_a_postType)
        .delete(authenticateAdmin, postTypeList.delete_a_postType);

    app.route('/postTypes/check/:postTypeId')
        .get(authenticateAdmin, postTypeList.read_a_postType_by_PostTypeId)

    app.route('/getPostTypes')
        .get(postTypeList.list_all_postTypes_for_qc);
};