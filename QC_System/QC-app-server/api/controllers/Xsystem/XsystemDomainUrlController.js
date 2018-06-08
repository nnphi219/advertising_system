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
    XsystemDomainUrl.insertMany()
    new_domainUrl.save(function (err, domainUrl) {
        if (err)
            res.send(err);
        res.json(domainUrl);
    });
};

exports.create_many_domainUrls = function (req, res) {
    let creator = req.user.username;
    XsystemDomainUrl.deleteMany({ nguoi_tao: creator }, function (err, domainUrl) {
        let domains = req.body;

        let arrayJsonInsertedDomains = domains.map(function (domain) {
            return {
                nguoi_tao: creator,
                domain: domain
            };
        });

        XsystemDomainUrl.insertMany(arrayJsonInsertedDomains, function (err, domainUrls) {
            if (err)
                res.send(err);
            res.json(domainUrls);
        });
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
    console.log(req.body.domainId);
    XsystemDomainUrl.remove({
        _id: req.body.domainId
    }, function (err, domainUrl) {
        if (err)
            res.send(err);
        res.json({ message: 'domainUrl successfully deleted' });
    });
};