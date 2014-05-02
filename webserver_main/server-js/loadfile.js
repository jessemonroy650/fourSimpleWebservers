/*
 * Date: 2014-02-15
 * Returns: file as text or  undefined
**/

var f = require('fs');

exports.asText = function (filename) {
	//console.log("in asText()");
	if (f.readFileSync) {
		// Per documentation:
		//   "If the encoding option is specified then this function returns a string. Otherwise it returns a buffer."
		// So we must specificy the type, else an error is throw trying to process.
        data = null;
		try {
			data = f.readFileSync(filename, {encoding: 'UTF-8'});
		} catch (err) {
			console.error('Error 404 - ' + err);
		}
		return data;
	} else {
		console.log("NO fs.readFileSync");
		return undefined;
	}
}
