'use strict';

var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');
const { ObjectID } = require('mongodb');

exports.list_all_tasks = function (req, res) {
  Task.find({
    _creator: req.user._id
  }, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_task = function (req, res) {
  var new_task = new Task(req.body);
  new_task._creator = req.user._id;

  new_task.save(function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function (req, res) {
  var id = req.params.taskId;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Task.findOne({
    _id: id,
    _creator: req.user._id
  }).then((task) => {
    if (!task) {
      return res.status(404).send();
    }

    res.send({ task });
  }).catch((e) => {
    res.status(400).send();
  });
};


exports.update_a_task = function (req, res) {
  var id = req.params.taskId;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Task.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }).then((task) => {
    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  }).catch((e) => {
    return res.status(400).send();
  });
};


exports.delete_a_task = function (req, res) {
  var id = req.params.taskId;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Task.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((task) => {
    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  }).catch((e) => {
    res.status(400).send();
  });
};