'use strict';
var { authenticateQCSystem } = require('../../middleware/authenticate');
var CommonVariable = require('../../share/CommonVariable');

const _ = require('lodash');
const rp = require('request-promise');

var mongoose = require('mongoose'),
    Post = mongoose.model('Posts');


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

    app.route('/GetPostsByPostIds')
        .post(postController.get_posts_by_PostIds);

    app.route('/getPostsBasicOnAppliedPage/:appliedPageId')
        .get(async (req, res) => {
            // Get post marketing from QC system
            let appliedPageId = req.params.appliedPageId;

            let postCampaginDisplay;
            try {
                postCampaginDisplay = await rp({
                    method: 'POST',
                    uri: "http://localhost:8080/GetPostsBasicOnAppliedPageAndXAdminUsername",
                    body: {
                        trang_ap_dung_id: appliedPageId,
                        x_admin_username: CommonVariable.UsernameOnQcSystem,
                        password: CommonVariable.PasswordOnQcSystem
                    },
                    json: true // Automatically parses the JSON string in the response
                });
            } catch (err) {
                console.log("--------------------")
                // console.log(err)
            }
           
            res.send(postCampaginDisplay);
        });
};