/*
    slightly modified for tutorial example
    Date: 2013-12-03T00:49:30
*/
var myname  = __filename;
var myhome  = __dirname;

var http    = require('http');
var path    = require('path');

var opersys      = require('./opersys');
var filesys      = require('./filesys');
var simpleString = require('./simpleStringf');
var loadfile     = require('./loadfile');

// The two (2) paths are to show that file can load relative or absolute.
var baseHTMLWrapper = "./htmlwrapper.html";
var baseHTMLBody    = myhome + "/htmlbody.html"

// These are template files. They work with simpleStringf() 
var theHTMLbase     = loadfile.asText(baseHTMLWrapper); 
var theHTMLTemplate = loadfile.asText(baseHTMLBody); 

function newData() {
	theData = [myname, myhome, opersys.opersys(), filesys.filesys(),
    	       JSON.stringify(myname.split(path.sep)),
        	   JSON.stringify(myhome.split(path.sep))];

	xyz     = simpleString.b_sprintf(theHTMLTemplate, theData);
	theHTML = simpleString.b_sprintf(theHTMLbase, [ xyz ]);
}
//console.log(theHTML);
/*
*
*	M	A	I	N
*
*/
http.createServer(function (request, response) {
  console.log(request.url);
  console.log(request.method);
  console.log(request.headers);
  //console.log(request);
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write('<!DOCTYPE HTML>\n');
  newData();
  response.write(theHTML);
  response.end('');
}).listen(50000);

//basicString.b_sprintf('%sdummy %s ', ['Hello', 'World']);

console.log('Server running at http://127.0.0.1:50000/');
