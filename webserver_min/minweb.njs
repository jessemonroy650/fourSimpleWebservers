/*
    Minimal Webserver
    Date: 2013-12-05
*/
var WEBSERVER_PORT = 8086;

var myname  = __filename;
var myhome  = __dirname;

var http    = require('http');
var path    = require('path');
var url     = require('url');

var myServerJS    = myhome + '/server-js';
var myDocRoot     = myhome + '/www';

var loadfile     = require(myServerJS + '/loadfile');
var merge        = require(myServerJS + '/merge-assoc');
//
var baseHTMLindex = myDocRoot + '/index.html'
var baseHTML404   = myDocRoot + '/404.html';
var theHTML404    = loadfile.asText(baseHTML404);
//
var theIndex      = {'/':true };
var theBinaries   = {'.ico':'image/x-icon', '.jpg':'image/jpeg', 'png':'image/png'}
var theTexts      = {'.js':'application/javascript', '.css':'text/css', '.html':'text/html', '.txt':'text/plain'};

var theMimeTypes  = merge.assocArray(theTexts, theBinaries);

/*
*
*	M	A	I	N
*
*/
http.createServer(function (request, response) {
    date = new Date();
    theDateUTC  = date.toUTCString();

    theURL = url.parse(request.url); // auth, pathname, search, query, hash

    //console.log("\"%s\" %s %s %s", theDateUTC,  request.method, request.url, path.dirname(theURL.pathname));

    isIndex  = theIndex[theURL.pathname];
    isBinay  = theBinaries[path.extname(theURL.pathname)];
    isAText  = theTexts[path.extname(theURL.pathname)];

    isMimeType = theMimeTypes[path.extname(theURL.pathname)];
    theExtIs   = (isMimeType) ? path.extname(theURL.pathname) : null;
    /*
    console.log("isIndex:%s %s", isIndex, theURL.pathname);
    console.log("isMimeType:%s %s", isMimeType, theURL.pathname);
    console.log("theExtIs:%s %s", theExtIs, theURL.pathname);
    */

    // Assume file load will fail.
    is404 = true;
    theDocument = '';
    // Load appropriate file
    if (isIndex) {
        theDocument = loadfile.asText( baseHTMLindex );
    } else if (isBinay) {
        theDocument = loadfile.asRaw( myDocRoot + theURL.pathname );
    } else if (isAText) {
        theDocument = loadfile.asText( myDocRoot + theURL.pathname );
    } else {
        theDocument = '';
    }

    // (further down) response.write() expects a 'String' or a 'Buffer'
    // So resolve, if "null" or "undefined" is returned from a loadfile.*,
    // because it (loadfile) throws an error - instead returning a flag.
    theDocument = (theDocument) ? theDocument : false; // '';
    is404       = (theDocument) ? false : true;

    if (is404) {
        theDocument  = loadfile.asText(baseHTML404)
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.write('<!DOCTYPE HTML>\n');
    } else {
        switch (theExtIs) { 
        case '.jpg':
        case '.png':
        case '.ico':
        case '.css':
        case '.txt':
        case '.js':
            response.writeHead(200, {'Content-Type': theMimeTypes[theExtIs]});
        break;
        case '.html':
        default:
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('<!DOCTYPE HTML>\n');
        break;
        }
    }

    response.write(theDocument);
    response.end('');

    // The documentation says:
    // """After response header was sent to the client,"""
    // """this property indicates the status code which was sent out."""
    console.log("\"%s\" %s %s %s", theDateUTC,  request.method, request.url, response.statusCode);

}).listen(WEBSERVER_PORT);


console.log('Server running at http://INADDR_ANY:'+ WEBSERVER_PORT + '/');

