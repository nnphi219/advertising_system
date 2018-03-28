export function DateToJsonDate(date) {
    var jsonDate = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
    }

    return jsonDate;
}

export function JsonDateToDate (jsonDate) {
    var date = new Date(jsonDate.year, jsonDate.month + 1, jsonDate.day);
    console.log(jsonDate);
    return date;
}