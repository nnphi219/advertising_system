export function DateToJsonDate(date) {
    var jsonDate = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    }

    return jsonDate;
}

export function JsonDateToDate (jsonDate) {
    var date = new Date(parseInt(jsonDate.year) , parseInt(jsonDate.month) - 1, parseInt(jsonDate.day));
    return date;
}