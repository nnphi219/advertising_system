'use strict';
const _ = require('lodash');
var { authenticate } = require('../../middleware/authenticate');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');

var mongoose = require('mongoose'),
  User = mongoose.model('Users');

exports.list_all_users = function (req, res) {
  User.find({}, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.create_a_user = function (req, res) {
  var body = _.pick(req.body, ['email', 'username', 'password', 'user_type']);
  var new_user = new User(body);
  if (new_user.user_type === undefined) {
    new_user.user_type = "user";
  }

  new_user.save()
    .then((new_user) => {
      return new_user.generateAuthToken(new_user.password);
    })
    .then((token) => {
      var userRes = {
        _id: new_user._id,
        email: new_user.email,
        username: new_user.username,
        accessToken: token
      };

      if(new_user.UrlApi !== undefined && new_user.UrlApi !== null) {
        userRes.UrlApi = new_user.UrlApi;
      }

      res.header('x-auth', token).json(userRes);
    })
    .catch((e) => {
      res.status(400).send(e);
    });

};

exports.read_a_user = function (req, res) {
  User.findById(req.params.userId, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });

  // authenticate(req, res, function(req, res) {
  //   res.send(req.user);
  // });
};


exports.update_a_user = function (req, res) {
  var id = req.params.userId;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  var updatedUser = _.pick(req.body, ['email', 'username', 'password', 'user_type']);

  if (updatedUser.password !== undefined) {
    updatedUser.password = bcrypt.hashSync(updatedUser.password);
  }

  User.findOneAndUpdate({ _id: id }, updatedUser, { new: true }, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.delete_a_user = function (req, res) {
  User.remove({
    _id: req.params.userId
  }, function (err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'successfully deleted' });
  });
};

exports.UserLogin = function (req, res) {
  var body = _.pick(req.body, ['username', 'password']);

  User.findByCredentials(body.username, body.password)
    .then((user) => {
      user.generateAuthToken().then((token) => {
        var userRes = {
          _id: user._id,
          email: user.email,
          username: user.username,
          accessToken: token
        };

        if(user.UrlApi !== undefined && user.UrlApi !== null) {
          userRes.UrlApi = user.UrlApi;
        }

        res.header('x-auth', token).send(userRes);
      });
    }).catch((e) => {
      res.status(400).send();
    });
};

exports.AuthenticateMe = function (req, res) {
  res.send(req.user);
};