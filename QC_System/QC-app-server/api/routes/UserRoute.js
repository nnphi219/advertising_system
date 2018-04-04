'use strict';
const _ = require('lodash');

module.exports = function(app) {
    var userController = require('../controllers/UserController');

    app.route('/users')
        .get(userController.list_all_users)
        .post(userController.create_a_user);

    app.route('/users/:userId')
        .get(userController.read_a_user)
        .put(userController.update_a_user)
        .delete(userController.delete_a_user);

    app.post('/users/login', (req, res) => {
        var body = _.pick(req.body, ['username', 'password']);
        
        res.send(req.body);
    });
};