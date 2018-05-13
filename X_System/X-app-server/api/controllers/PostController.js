'use strict';

var mongoose = require('mongoose'),
  Post = mongoose.model('Posts');

exports.list_all_posts = function (req, res) {
  Post.find({ nguoi_tao: req.user._id }, function (err, post) {
    if (err)
      res.send(err);
    res.json(post);
  });
};

exports.list_all_posts_for_marketing = function (req, res) {
  Post.find({}, function (err, post) {
    if (err)
      res.send(err);
    res.json(post);
  });
};

exports.get_posts_by_PostIds = function (req, res) {
  var postIds = req.body.postIds;

  Post.find({ "ma_bai_dang": { $in: postIds } }, function (err, posts) {
    if (err)
      res.send(err);
    res.json(posts);
  });
};

exports.create_a_post = function (req, res) {
  var creatorID = req.user._id;
  var new_post = new Post(req.body);
  new_post.nguoi_tao = creatorID;

  new_post.save(function (err, post) {
    if (err)
      res.send(err);
    res.json(post);
  });
};


exports.read_a_post = function (req, res) {
  Post.findById(req.params.postId, function (err, post) {
    if (err)
      res.send(err);
    res.json(post);
  });
};


exports.update_a_post = function (req, res) {
  Post.findOneAndUpdate({ _id: req.params.postId }, req.body, { new: true }, function (err, post) {
    if (err)
      res.send(err);
    res.json(post);
  });
};


exports.delete_a_post = function (req, res) {
  Post.remove({
    _id: req.params.postId
  }, function (err, post) {
    if (err)
      res.send(err);
    res.json({ message: 'Post successfully deleted' });
  });
};