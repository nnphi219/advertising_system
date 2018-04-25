export function DateToJsonDate(date) {
    var jsonDate = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    }

    return jsonDate;
}

export function JsonDateToDate(jsonDate) {
    var date = new Date(parseInt(jsonDate.year, 10), parseInt(jsonDate.month, 10) - 1, parseInt(jsonDate.day, 10), null, null, null, null);
    return date;
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
    var valueJson = { "bat_dau": timeLogArr[0], "ket_thuc": timeLogArr[1] };
    return valueJson;
}

export function TransferdisplayMechanismToText(value) {
    var result = "";
    if (value === "doc_quyen") {
        result = "Độc quyền";
    }
    else if (value === "co_dinh_vi_tri") {
        result = "Cố định vị trí";
    }
    else if (value === "chia_se_co_dinh") {
        result = "Chia sẻ cố định";
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
            { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        }
        else {
            { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
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
            { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        }
        else {
            { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
        }
    });
};