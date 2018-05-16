'use strict';

var mongoose = require('mongoose'),
    XsystemDomainUrl = mongoose.model('xsystem_domain_urls');

exports.list_all_domain_urls = function (req, res) {
    let creator = req.user.username;
    let conditionFilter = {
        nguoi_tao: creator
    };

    XsystemDomainUrl.find(conditionFilter, function (err, domainUrls) {
        if (err)
            res.send(err);
        res.json(domainUrls);
    });
};

exports.create_a_domainUrl = function (req, res) {
    var creator = req.user.username;
    var new_domainUrl = new XsystemDomainUrl(req.body);
    new_domainUrl.nguoi_tao = creator;

    new_domainUrl.save(function (err, domainUrl) {
        if (err)
            res.send(err);
        res.json(domainUrl);
    });
};


exports.read_a_domainUrl = function (req, res) {
    XsystemDomainUrl.findById(req.params.domainUrlId, function (err, domainUrl) {
        if (err)
            res.send(err);
        res.json(domainUrl);
    });
};

exports.update_a_domainUrl = function (req, res) {
    XsystemDomainUrl.findOneAndUpdate({ _id: req.params.domainUrlId }, req.body, { new: true }, function (err, domainUrl) {
        if (err)
            res.send(err);
        res.json(domainUrl);
    });
};


exports.delete_a_domainUrl = function (req, res) {
    XsystemDomainUrl.remove({
        _id: req.params.domainUrlId
    }, function (err, domainUrl) {
        if (err)
            res.send(err);
        res.json({ message: 'domainUrl successfully deleted' });
    });
};