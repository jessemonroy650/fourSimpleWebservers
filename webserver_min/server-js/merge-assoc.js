/*
 * Date: 2014-04-05
 * Returns: two associative arrays after merging
**/


// http://stackoverflow.com/questions/929776/merging-associative-arrays-javascript
exports.assocArray = function (array1,array2) {
    for(item in array1) {
        array2[item] = array1[item];
    }
    return array2;
}
