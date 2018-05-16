var mongoose = require('mongoose');
const _ = require('lodash');

var XsystemApiUrlSchema = new mongoose.Schema({
    api_url: String,
    nguoi_tao: String
});

var XsystemApiUrl = mongoose.model('xsystem_api_urls', XsystemApiUrlSchema);
module.exports = XsystemApiUrl;