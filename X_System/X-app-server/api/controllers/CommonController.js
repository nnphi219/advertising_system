'use strict';
var fs = require('fs');

var mongoose = require('mongoose');

exports.get_font_families = function (req, res) {
    var fonts = {
        FontFamilies: [
            '\'Franklin Gothic Medium\', \'Arial Narrow\', Arial, sans-serif',
            '\'Gill Sans\', \'Gill Sans MT\', Calibri, \'Trebuchet MS\', sans-serif',
            '\'Times New Roman\', Times, serif',
            'Arial',
            'Calibri',
            '.VnCommercial ScriptH'
        ]
    };

    res.json(fonts);
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