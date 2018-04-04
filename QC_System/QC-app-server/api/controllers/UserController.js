'use strict';
const _ = require('lodash');
var { authenticate } = require('../../middleware/authenticate');

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
  var body = _.pick(req.body, ['email', 'username', 'password']);
  var new_user = new User(body);
  if (new_user.user_type === undefined) {
    new_user.user_type = "user";
  }
  // res.send(body);
  new_user.save()
    .then((new_user) => {
      return new_user.generateAuthToken(new_user.password);
    })
    .then((token) => {
      res.header('x-auth', token).json(new_user);
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
  User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, function (err, user) {
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