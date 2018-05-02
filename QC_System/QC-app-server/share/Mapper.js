
module.exports = {
    DateToJsonDate: function (date) {
        var jsonDate = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }

        return jsonDate;
    },

    JsonDateToDate: function (jsonDate) {
        var date = new Date(parseInt(jsonDate.year, 10), parseInt(jsonDate.month, 10) - 1, parseInt(jsonDate.day, 10), null, null, null, null);
        return date;
    }
}