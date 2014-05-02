/*
 * Date: 2014-02-14
 * Purpose: This function performs the most basic substitution ala sprintf(2).
**/
// NOTE: 2nd parameter must always be an array, not a string.
exports.b_sprintf = function(str, arrayOfValues) {
	if (str) {
		slen = str.length;
    	len = arrayOfValues.length;
	    //console.log("slen=" + slen + "\nlen=" + len);
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