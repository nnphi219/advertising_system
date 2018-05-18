'use strict';
var {  authenticate } = require('../../../middleware/authenticate');

module.exports = function(app) {
    var xsystemPostTypeController = require('../../controllers/Xsystem/XsystemPostTypeController');

    app.route('/XsystempostTypes')
        .get(authenticate, xsystemPostTypeController.list_all_postTypes)
        .post(authenticate, xsystemPostTypeController.create_a_postType);

    app.route('/XsystempostTypes/:postTypeId')
        .get(authenticate, xsystemPostTypeController.read_a_postType)
        .put(authenticate, xsystemPostTypeController.update_a_postType)
        .delete(authenticate, xsystemPostTypeController.delete_a_postType);

    app.route('/XsystempostTypes/check/:postTypeId')
        .get(authenticate, xsystemPostTypeController.read_a_postType_by_PostTypeId)

    app.route('/getXsystemPostTypes')
        .get(xsystemPostTypeController.list_all_postTypes_for_qc);
};