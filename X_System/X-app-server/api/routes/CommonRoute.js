'use strict';
module.exports = function (app) {
    var commonList = require('../controllers/CommonController');

    app.route('/getfontfamilies')
        .get(commonList.get_font_families);

    app.route('/uploads')
        .post(commonList.persist_a_file);
};