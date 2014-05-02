/*
 * Date: 2014-02-15
 * Returns: file as text or  undefined
**/

fs = require('fs');

exports.asText = function (filename) {
	console.log("in asText()");
	if (fs.readFileSync) {
		// Per documentation:
		//   "If the encoding option is specified then this function returns a string. Otherwise it returns a buffer."
		// So we must specificy the type, else an error is throw trying to process.
		return fs.readFileSync(filename, {encoding: 'UTF-8'});
	} else {
		console.log("NO fs.readFileSync");
		return undefined;
	}
}
