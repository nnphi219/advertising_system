'use strict';
var { authenticate } = require('../../middleware/authenticate');

module.exports = function (app) {
    var adsAreaController = require('../controllers/AdsAreaController');

    app.route('/adsAreas')
        .get(authenticate, adsAreaController.list_all_adsAreas)
        .post(authenticate, adsAreaController.create_a_adsArea);

    app.route('/adsAreas/:adsAreaId')
        .get(authenticate, adsAreaController.read_a_adsArea)
        .put(authenticate, adsAreaController.update_a_adsArea)
        .delete(authenticate, adsAreaController.delete_a_adsArea);

    app.route('/getadsAreasInfo')
        .get(authenticate, adsAreaController.read_adsArea_Info);

    app.route('/adsAreas/check/:adsAreaId')
        .get(authenticate, adsAreaController.read_a_adsArea_by_adsAreaId);
};