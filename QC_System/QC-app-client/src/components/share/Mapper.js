export function DateToJsonDate(date) {
    var jsonDate = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    }

    return jsonDate;
}

export function JsonDateToDate(jsonDate) {
    var date = new Date(parseInt(jsonDate.year), parseInt(jsonDate.month) - 1, parseInt(jsonDate.day), null, null, null, null);
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