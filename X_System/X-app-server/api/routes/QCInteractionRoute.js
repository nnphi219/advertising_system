'use strict';
var { authenticateQCSystem } = require('../../middleware/authenticate');

module.exports = function(app) {
    var postController = require('../controllers/PostController');

    app.route('/getPostByUserToken')
        .get(authenticateQCSystem, postController.list_all_posts);
};