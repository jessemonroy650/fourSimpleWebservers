/*
* Date: 2014-02-12
*/
var filesys = require('fs');

exports.filesys = function() {
	var rootFs    = filesys.statSync('/');
	var isRoot    = rootFs.isDirectory()
	var devFs     = filesys.statSync('/dev');
	var isDev     = devFs.isDirectory()
	// RRR - The device can change. Can also be ttyUSB1.
	var roombaDev = '/dev/ttyUSB0';
	var devRoomba = null;
	var isRooomba = null;
	try {
		var devRoomba = filesys.statSync(roombaDev);
		var isRooomba = devRoomba.isCharacterDevice()
	} catch (err) {
		console.error(err);
	}

	var fileSysString = "isRoot:" + isRoot + "<br />"  +
			"isDev:" + isDev + "<br />" +
			"isRooomba:" + isRooomba + " at " + roombaDev + "<br />";

	return fileSysString;
}