export function ArrayRemoveItem(array, item) {
    var indexOfItem = array.indexOf(item);
    if(indexOfItem > -1){
        array.splice(indexOfItem , 1);
    }
}