'use strict';

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
  var new_user = new User(req.body);
  if (new_user.user_type === undefined) {
    new_user.user_type = "user";
  }
  new_user.save(function (err, user) {
    if (err) {
      res.send(err);
    }
    else {
      return user.generateAuthToken();
    }

  });
};


exports.read_a_user = function (req, res) {
  User.findById(req.params.userId, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
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