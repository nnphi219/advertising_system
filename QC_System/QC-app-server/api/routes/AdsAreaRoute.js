'use strict';
module.exports = function(app) {
    var adsAreaController = require('../controllers/AdsAreaController');

    app.route('/adsAreas')
        .get(adsAreaController.list_all_adsAreas)
        .post(adsAreaController.create_a_adsArea);

    app.route('/adsAreas/:adsAreaId')
        .get(adsAreaController.read_a_adsArea)
        .put(adsAreaController.update_a_adsArea)
        .delete(adsAreaController.delete_a_adsArea);
};