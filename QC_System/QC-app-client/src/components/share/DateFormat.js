export function Date2BiggerDate1(date1, date2) {
    let date1_year = parseInt(date1.getFullYear(), 10),
        date1_month = parseInt(date1.getMonth() + 1, 10),
        date1_day = parseInt(date1.getDate(), 10),

        date2_year = parseInt(date2.getFullYear(), 10),
        date2_month = parseInt(date2.getMonth() + 1, 10),
        date2_day = parseInt(date2.getDate(), 10);

    if (date2_year > date1_year){
        return true;
    }
    else if (date2_year < date1_year){
        return false;
    }
    else{
        if (date2_month > date1_month){
            return true;
        }
        else if (date2_month < date1_month){
            return false;
        }
        else{
            if (date2_day > date1_day){
                return true;
            }
            else{
                return false;
            }
        }
    }
}