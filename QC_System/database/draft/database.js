




{
	"Collection": "AdsAreaSchema", 
	"Data": {
		"ads_service_id": "string",
		"ads_name": "string",
		"ads_description": "string",
		"post_apply_type": "string",
		"title_color": "string",
		"title_font_family": "string",
		"title_font_size": "double",
		"border_size": "double",
		"des_characters_quantity": "long",
		"avatar": "string",
		"number_of_show_image": "integer",
		"image_size": "long",
		"video_size": "long",
		"applied_ads_page_type": "string",
		"max_post_number": "integer",
		"area_sharing_quantity": "integer",
		"area_size": {
			"width": "double",
			"height": "double"
		},
		"post_size": {
			"width": "double",
			"height": "double"
		},
		"status": "string",
		"create_date": {
			"type": "Date",
			"default": "Date.now"
		}
		"update_date": {
			"type": "Date",
			"default": "Date.now"
		}
	}
}

//-----------------------------

{
	"Collection": "PriceFactorSchema",
	"Data": {
		"factor_name": String,
		"price_id": String,
		"factor_unit": String,
		"factor_type": String,
		"estimation": String,
		"rate_calculation": String,
		"real_price": String,
		"status": String,
		"start_date": Date,
		"end_date": Date,
		"create_date": {
			"type": Date,
			"default": Date.now
		}
		"update_date": {
			"type": Date,
			"default": Date.now
		}
	}
}

//--------------------------------

{
	"Collection": "PriceSchema",
	"Data": {
		"price_id": String,
		"ads_service_id_refs": String, // Refs AdsAreaSchema.ads_service_id
		"price": Number,
		"price_description": String,
		"price_type": Number, //1.CPD, 2.....
		"applied_unit_number": Number, //day, view, ...,
		"mechanism_type": String //(độc quyền, cố định vị trí, Chia sẻ vị trí cố định, ngẫu nhiên)
		"start_date": Date,
		"end_date": Date,
		"create_date": {
			"type": Date,
			"default": Date.now
		}
		"update_date": {
			"type": Date,
			"default": Date.now
		}
	}
}