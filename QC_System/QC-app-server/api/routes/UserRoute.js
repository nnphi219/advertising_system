'use strict';
const _ = require('lodash');
var { authenticate } = require('../../middleware/authenticate');

var urldetail = "/users";

module.exports = function (app) {
    var userController = require('../controllers/UserController');

    app.get(urldetail + '/me', authenticate, (req, res) => {
        res.send(req.user);
    });

    app.route(urldetail)
        .get(userController.list_all_users)
        .post(userController.create_a_user);

    app.route(urldetail + '/:userId')
        .get(userController.read_a_user)
        .put(userController.update_a_user)
        .delete(userController.delete_a_user);

    app.post(urldetail + '/login', userController.UserLogin);

    app.delete(urldetail + '/me/token', authenticate, (req, res) => {
        req.user.removeToken(req.token).then(() => {
            res.status(200).send();
        }, () => {
            res.status(400).send();
        });
    });
};