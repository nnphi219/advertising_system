export function DateToJsonDate(date) {
    let jsonDate = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    }

    return jsonDate;
}

export function JsonDateToDate(jsonDate) {
    if (jsonDate) {
        let date = new Date(parseInt(jsonDate.year, 10), parseInt(jsonDate.month, 10) - 1, parseInt(jsonDate.day, 10), null, null, null, null);
        return date;
    }
    else {
        return new Date();
    }
}

export function TransferFactorUnitKeyToText(value) {
    var factorUnitText = value === "thoi_luong" ? "Thời lượng" : (value === "khung_gio" ? "Khung giờ" : "Vị trí");
    return factorUnitText;
}

export function TransferTimeLogJsonToString(valueJson) {
    return `${valueJson.bat_dau.toString()}h-${valueJson.ket_thuc.toString()}h`;
}

export function TransferTimeLogStringToJson(value) {
    var timeLogArr = value.split("h").join("").split('-');
    var valueJson = { "bat_dau": parseInt(timeLogArr[0], 10), "ket_thuc": parseInt(timeLogArr[1], 10) };
    return valueJson;
}

export function TransferTimeLogStringToArrayElement(value, array_bat_dau, array_ket_thuc) {
    var timeLogArr = value.split("h").join("").split('-');
    array_bat_dau.push(parseInt(timeLogArr[0], 10));
    array_ket_thuc.push(parseInt(timeLogArr[1], 10));
}

export function TransferdisplayMechanismToText(value) {
    var result = "";
    if (value === "doc_quyen") {
        result = "Độc quyền";
    }
    else if (value === "co_dinh_vi_tri") {
        result = "Cố định vị trí";
    }
    else if (value === "chia_se_vi_tri_co_dinh") {
        result = "Chia sẻ vị trí cố định";
    } else if (value === "ngau_nhien") {
        result = "Ngẫu nhiên";
    }

    return result;
}

// ------------------ ads area

export function TransferSelectInputKeyToValue(value, keys, values) {
    var i = 0;
    var isFound = false;
    var result = values[0];

    while (i < keys.length && !isFound) {
        if (keys[i] === value) {
            result = values[i];
            isFound = true;
        }
        i++;
    }

    return result;
}


// ---------------------- sort

export function JsonSort(data, keys, isASC) {
    if (keys === '') {
        return data;
    }

    var keyArr = keys.split('.');

    return data.sort(function (a, b) {
        var x = a;
        var y = b;
        keyArr.forEach(key => {
            x = (x === undefined) ? undefined : x[key];
            y = (y === undefined) ? undefined : y[key];
        });

        if (x !== undefined && y === undefined) {
            if (isASC) {
                return 1;
            }
            else {
                return -1;
            }
        }

        if (x === undefined && y !== undefined) {
            if (isASC) {
                return -1;
            }
            else {
                return 1;
            }
        }

        if (isASC) {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }
        else {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
};

export function JsonSortDateType(data, keyDate, isASC) {
    if (keyDate === '') {
        return data;
    }

    return data.sort(function (a, b) {
        var x = a[keyDate];
        var y = b[keyDate];

        if (x !== undefined && y === undefined) {
            if (isASC) {
                return 1;
            }
            else {
                return -1;
            }
        }

        if (x === undefined && y !== undefined) {
            if (isASC) {
                return -1;
            }
            else {
                return 1;
            }
        }

        x = JsonDateToDate(x);
        y = JsonDateToDate(y);

        if (isASC) {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }
        else {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
};

export function Transfer_Provice_District_JsonToArray(data_province_district) {
    var list_province_district = [];

    Object.keys(data_province_district).forEach(province_district_key => {
        var province_district_mapper = {};
        var province = data_province_district[province_district_key];

        province_district_mapper.code = province.code;
        province_district_mapper.slug = province.slug;
        province_district_mapper.type = province.type;
        province_district_mapper.name = province.name;
        province_district_mapper.name_with_type = province.name_with_type;
        province_district_mapper.quan_huyen = [];

        var districts = province["quan-huyen"];
        Object.keys(districts).forEach(district_key => {
            var district_mapper = {};
            var district = districts[district_key];

            district_mapper.code = district.code;
            district_mapper.slug = district.slug;
            district_mapper.type = district.type;
            district_mapper.name = district.name;
            district_mapper.name_with_type = district.name_with_type;
            district_mapper.parent_code = district.parent_code;

            province_district_mapper.quan_huyen.push(district_mapper);
        });

        list_province_district.push(province_district_mapper);
    });

    return list_province_district;
}

export function GetProvinces(list_province_district) {
    var provinceCodes = [""];
    var provinceNames = ["Lựa chọn"];

    list_province_district.forEach(province => {
        provinceCodes.push(province.code);
        provinceNames.push(province.name_with_type);
    });

    return {
        codes: provinceCodes,
        names: provinceNames
    };
}

export function GetDistrictsBasicOnProvince(provinceCode, list_province_district) {
    var districtCodes = [""];
    var districtNames = ["Lựa chọn"];

    if (provinceCode === undefined || provinceCode === null || provinceCode === "") {
        return {
            codes: [],
            names: []
        }
    }

    var selectedProvince = list_province_district.find(function (province) {
        return province.code === provinceCode;
    });

    var districtsInProvince = selectedProvince.quan_huyen.slice();

    districtsInProvince.forEach(district => {
        districtCodes.push(district.code);
        districtNames.push(district.name_with_type);
    });

    return {
        codes: districtCodes,
        names: districtNames
    }
}