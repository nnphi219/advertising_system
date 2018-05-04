'use strict';
var { authenticateQCSystem } = require('../../middleware/authenticate');
const _ = require('lodash');


module.exports = function (app) {
    var postController = require('../controllers/PostController');
    var userController = require('../controllers/UserController');

    app.route('/getPostByUserToken')
        .get(authenticateQCSystem, postController.list_all_posts);

    app.route('/checkXUserauthenticate')
        .get(authenticateQCSystem, (req, res) => {
            let email = req.user.email;
            
            let resValue = {
                'x_user_specific_info': email
            };

            res.send(resValue);
        });
};