var mongoose = require('mongoose');
const _ = require('lodash');

var XsystemDomainUrlSchema = new mongoose.Schema({
    domain: String,
    nguoi_tao: String
});

var XsystemDomainUrl = mongoose.model('xsystem_domain_urls', XsystemDomainUrlSchema);
module.exports = XsystemDomainUrl;