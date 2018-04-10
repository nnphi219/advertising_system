'use strict';
var { authenticate } = require('../../middleware/authenticate');

module.exports = function(app) {
    var postController = require('../controllers/PostController');

    app.route('/posts')
        .get(authenticate, postController.list_all_posts)
        .post(authenticate, postController.create_a_post);

    app.route('/posts/:postId')
        .get(authenticate, postController.read_a_post)
        .put(authenticate, postController.update_a_post)
        .delete(authenticate, postController.delete_a_post);

    app.route('/post/:postId')
        .get(postController.read_a_post);

    app.route('/marketing')
        .get(postController.list_all_posts_for_marketing);
};