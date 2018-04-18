'use strict';

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