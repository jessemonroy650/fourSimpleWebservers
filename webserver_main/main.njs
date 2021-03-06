/*
    Modified tutorial example
    Date: 2013-12-03T00:49:30
*/
var WEBSERVER_PORT = 50000;
var VERSION = "1396942979";

var myname  = __filename;
var myhome  = __dirname;

var http    = require('http');
var path    = require('path');
var fs      = require('fs');
var url     = require('url');

// My libraries
var opersys      = require(myhome + '/server-js/opersys'); // Some operating system information
var filesys      = require(myhome + '/server-js/filesys'); // Some file system information
// simplified printf(1) -  See also: https://en.wikipedia.org/wiki/Printf_format_string
var simpleString = require(myhome + '/server-js/simpleStringf');  
var loadfile     = require(myhome + '/server-js/loadfile');       // loads a file
var rExt         = require(myhome + '/server-js/resolvext');

// The two (2) paths are to show that file can load relative or absolute.
var baseHTMLWrapper = myhome + "/html/Wrapper.html";
var baseHTMLMenu    = myhome + "/html/mainmenu.html"

// These are template files. They work with simpleStringf() 
var theHTMLWrapper = loadfile.asText(baseHTMLWrapper); 
var theHTMLMenu    = loadfile.asText(baseHTMLMenu); 

var theTexts = {'.js':'application/javascript', '.css':'text/css', '.html':'text/html'};

/*
*
*	M	A	I	N
*
*/
http.createServer(function (request, response) {
    date = new Date();
    theDateUTC = date.toUTCString();
    theHTMLWrapper = loadfile.asText(baseHTMLWrapper);
    theHTMLMenu    = loadfile.asText(baseHTMLMenu);
    the404Error    = '<div class=error404>404 - Not Found</div>';

    //console.log( "\"%s\" %s %s", theDateUTC,  request.method, request.url);

    // After parse some useful parameters: auth, pathname, search, query, hash
    // 'true' as the second argument to also parse the query string into object,
    // else returns just a string. 
    theURL = url.parse(request.url, true);

    // Setup logic states.
    isAnExt    = theTexts[path.extname(theURL.pathname)];
    isMimeType = theTexts[path.extname(theURL.pathname)];
    // Extract any values we may need.
    theExtIs   = (isAnExt) ? path.extname(theURL.pathname) : '';
    theMimeIs  = theTexts[theExtIs];


    // Assemble data for the document or REST interface
    contentType = 0;
    theData = simpleString.b_sprintf(theHTMLWrapper, [ '', request.url , '']);
    if (request.url === '/') {
        theJavascript = loadfile.asText(myhome + "/js/index.js");

        theData = simpleString.b_sprintf(theHTMLWrapper, [ theJavascript, theHTMLMenu, '' ]);
        contentType = 0; // 'html';

    } else if (rExt.isExt(request.url, '.css')) {
        theData = loadfile.asText( myhome + request.url );
        contentType = 1; //'css';

    } else if (rExt.isExt(request.url, '.js')) {
        theData = loadfile.asText( myhome + request.url );
        contentType = 2; //'js';

    } else if (rExt.isExt(request.url, '.html')) {
        // This is intended for auxillary pages, like "help".
        theData = loadfile.asText( myhome + request.url );
        contentType = ( theData == null ) ? 255 : 0 ; //'html';
        theData = ( theData == null ) ?  simpleString.b_sprintf(theHTMLWrapper, [ '', theHTMLMenu, the404Error ]) : theData;

    } else if (request.url === '/favicon.ico') {
        theData = loadfile.asText( myhome + request.url );
        contentType = 255; // 404 - not Found;

    } else if (request.url === '/system') {

        sname = myname.split(path.sep);
        scriptname  = sname[sname.length - 1];

        theJavascript = loadfile.asText(myhome + "/js/system.js");

        dataWrapper = loadfile.asText(myhome + "/html/system.html");
        sysData = simpleString.b_sprintf(dataWrapper,
                      [ scriptname, myhome, opersys.opersys(), filesys.filesys(),
                      JSON.stringify(myname.split(path.sep)),
                      JSON.stringify(myhome.split(path.sep)) ] );
        theData = simpleString.b_sprintf(theHTMLWrapper, [ theJavascript, theHTMLMenu, sysData ]);
        contentType = 0; // 'html';

    } else if (request.url === '/monitor') {

        theJavascript = loadfile.asText(myhome + "/js/monitor.js");

        dataWrapper = loadfile.asText(myhome + "/html/monitor.html");
        monData = simpleString.b_sprintf(dataWrapper, [ request.url ] );
        theData = simpleString.b_sprintf(theHTMLWrapper, [ theJavascript, theHTMLMenu, monData]);
        contentType = 0; // 'html';

    } else if (request.url === '/navigate') {

        theJavascript = loadfile.asText(myhome + "/js/navigate.js");

        data = loadfile.asText(myhome + "/html/navigate.html");
        theData = simpleString.b_sprintf(theHTMLWrapper, [ theJavascript, theHTMLMenu, data ]);
        contentType = 0; // 'html';

    } else {
        theData = simpleString.b_sprintf(theHTMLWrapper, [ '', theHTMLMenu, the404Error]);
        contentType = 255; // 404 - not Found;
    }

    // Added on 2014-04-06
    // Short-circuit an empty buffer to 404 error
    contentType = (theData) ? contentType : 255;

    //////////////////////
    //    O U T P U T
    //////////////////////
    switch (contentType) {
        case 0: // '.html'
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('<!DOCTYPE HTML>\n');
        break;
        case 1: // '.css'
            response.writeHead(200, {'Content-Type': 'text/css'});
        break;
        case 2: // '.js'
            response.writeHead(200, {'Content-Type': 'application/javascript'});
        break;
        // Set 404 as the default
        default: // 404 http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
            response.writeHead(404, {'Content-Type': 'text/html'});
            theData     = the404Error;
        break;
        }
    response.write(theData);
    response.end('');

    // The documentation says:
    // """After response header was sent to the client,"""
    // """this property indicates the status code which was sent out."""
    console.log("\"%s\" %s %s %s", theDateUTC,  request.method, request.url, response.statusCode);

}).listen(WEBSERVER_PORT);


console.log('Server running at http://127.0.0.1:'+ WEBSERVER_PORT + '/');
