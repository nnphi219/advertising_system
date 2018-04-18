'use strict';
module.exports = function(app) {
    var commonList = require('../controllers/CommonController');

    app.route('/getfontfamilies')
        .get(commonList.get_font_families);
};