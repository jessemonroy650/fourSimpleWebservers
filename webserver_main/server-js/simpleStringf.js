/*
 * Date: 2014-02-14
 * Purpose: This function performs the most basic substitution ala sprintf(2).
**/
// NOTE: 2nd parameter must always be an array, NOTE a string.
exports.b_sprintf = function(str, arrayOfValues) {
    if (str) {
        slen = str.length;
        rlen = str.match(/%s/g).length;
        len  = arrayOfValues.length;
        /* DEBUG - sometimes the array intrepelation is not what one expects.
        console.log("string_len=" + slen + "\nnum_replace=" + rlen + "\narray_len=" + len);
        */
            //console.log('str=' + str);
        i = 0;
        while (i < len) {
            //console.log(arrayOfValues[i]);
            str = str.replace(/%s/, arrayOfValues[i]);
            //console.log('str=' + str);
            i++;
        }
        return str;
    }
    return undefined;
}