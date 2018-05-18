'use strict';

var mongoose = require('mongoose'),
    XsystemApiUrl = mongoose.model('xsystem_api_urls');

exports.list_all_api_urls = function (req, res) {
    let creator = req.user.username;
    let conditionFilter = {
        nguoi_tao: creator
    };

    XsystemApiUrl.find(conditionFilter, function (err, apiUrls) {
        if (err)
            res.send(err);
        res.json(apiUrls);
    });
};

exports.create_a_apiUrl = function (req, res) {
    var creator = req.user.username;
    var new_apiUrl = new XsystemApiUrl(req.body);
    new_apiUrl.nguoi_tao = creator;

    new_apiUrl.save(function (err, apiUrl) {
        if (err)
            res.send(err);
        res.json(apiUrl);
    });
};

exports.create_many_apiUrls = function (req, res) {
    let creator = req.user.username;
    XsystemApiUrl.deleteMany({ nguoi_tao: creator }, function (err, apiUrl) {
        let apis = req.body;

        let arrayJsonInsertedApis = apis.map(function (api) {
            return {
                nguoi_tao: creator,
                api_url: api
            };
        });

        XsystemApiUrl.insertMany(arrayJsonInsertedApis, function (err, apiUrls) {
            if (err)
                res.send(err);
            res.json(apiUrls);
        });
    });

};
exports.read_a_apiUrl = function (req, res) {
    XsystemApiUrl.findById(req.params.apiUrlId, function (err, apiUrl) {
        if (err)
            res.send(err);
        res.json(apiUrl);
    });
};

exports.update_a_apiUrl = function (req, res) {
    XsystemApiUrl.findOneAndUpdate({ _id: req.params.apiUrlId }, req.body, { new: true }, function (err, apiUrl) {
        if (err)
            res.send(err);
        res.json(apiUrl);
    });
};


exports.delete_a_apiUrl = function (req, res) {
    XsystemApiUrl.remove({
        _id: req.params.apiUrlId
    }, function (err, apiUrl) {
        if (err)
            res.send(err);
        res.json({ message: 'apiUrl successfully deleted' });
    });
};