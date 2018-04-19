'use strict';
var fs = require('fs');

var mongoose = require('mongoose'),
    PostManagement = mongoose.model('PostManagement');

exports.list_all_postManagement = function (req, res) {
    PostManagement.find({}, function (err, postManagement) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(postManagement);
        }
    });
};

exports.create_a_postManagement = function (req, res) {
    var new_postManagement = new PostManagement(req.body);
    new_postManagement.trang_thai = 1;
    
    new_postManagement.save(function (err, postManagement) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(postManagement);
        }
    });
};


exports.read_a_postManagement = function (req, res) {
    PostManagement.findById(req.params.postManagementId, function (err, postManagement) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(postManagement);
        }
    });
};


exports.update_a_postManagement = function (req, res) {
    PostManagement.findOneAndUpdate({ _id: req.params.postManagementId }, req.body, { new: true }, function (err, postManagement) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(postManagement);
        }
    });
};


exports.delete_a_postManagement = function (req, res) {
    PostManagement.remove({
        _id: req.params.postManagementId
    }, function (err, postManagement) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ message: 'successfully deleted' });
        }
    });
};

exports.persist_a_file = (req, res) => {
    let imageFile = req.files.file;
    let dir = `${__dirname}/../../uploads`;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    imageFile.mv(`${dir}/${req.body.filename}.jpg`, function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
      res.json({file: `uploads/${req.body.filename}.jpg`});
    });
}