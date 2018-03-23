'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdsAreaSchema = new Schema({
    ads_service_id: String,
    ads_name: String,
    ads_description: String,
    post_apply_type: String,
    title_color: String,
    title_font_family: String,
    title_font_size: Number,
    border_size: Number,
    have_border: Boolean,
    border_color: String,
    des_characters_quantity: Number,
    avatar: String, // Image or video
    number_of_show_image: Number,
    image_size: Number,
    video_size: Number,
    applied_ads_page_type: String, //
    max_post_number: Number,
    area_sharing_quantity: Number,
    title_effect: String, // hiệu ứng tiêu đề.
    area_size: { 
        width: Number,
        height: Number
    },
    post_size: { 
        width: Number,
        height: Number
    },
    status: Number,
    preview_characters_quantity: Number,
    show_video: Boolean,
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AdsAreas', AdsAreaSchema);