module.exports = {
    ArrayRemoveItem: function (array, item) {
        var indexOfItem = array.indexOf(item);
        if (indexOfItem > -1) {
            array.splice(indexOfItem, 1);
        }
    },

    CheckArrayTimeSlotsContainsElement: function (timeSlots, element) {
        var isFinished = false;
        var index = 0;
        var result = false;

        while (!isFinished && index < timeSlots.length) {
            let timeSlot = timeSlots[index];

            if (timeSlot.bat_dau == element.bat_dau && timeSlot.ket_thuc == element.ket_thuc) {
                result = true;
                isFinished = true;
            }

            index++;
        }

        return result;
    }
}