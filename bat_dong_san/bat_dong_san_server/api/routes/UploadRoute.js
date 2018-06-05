'use strict';
var http = require('http')
  , fs = require('fs');

module.exports = function (app) {

    app.route('/upload')
        .post(function (req, res) {
            var file = req.body;
            fs.writeFile(file.name, file, 'binary', function(err){
                if (err) throw err
                console.log('File saved.')
            })
        });
};