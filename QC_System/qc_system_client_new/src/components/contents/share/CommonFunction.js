export function ArrayRemoveItem(array, item) {
    var indexOfItem = array.indexOf(item);
    if (indexOfItem > -1) {
        array.splice(indexOfItem, 1);
    }
}

export function NumberFormat(num){
    var n = num.toString(), p = n.indexOf('.');
    return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function($0, i){
        return p<0 || i<p ? ($0+',') : $0;
    });
}