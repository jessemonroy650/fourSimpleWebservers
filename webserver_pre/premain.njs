/*
    Modified tutorial example
    Date: 2013-12-03T00:49:30
*/
var WEBSERVER_PORT = 40006;
var VERSION = "1396915580";

var myname  = __filename;
var myhome  = __dirname;

var http    = require('http');
var path    = require('path');
var url     = require('url');

// directories where stuff is stored
var myServerJS    = myhome + '/server-js';
var myHTML        = myhome + '/html';
var myCSS         = myhome + '/css';
var myJScript     = myhome + '/js';
var myJScriptPre  = myhome + '/js-pre';
var myJScriptPost = myhome + '/js-post';

// My libraries
var opersys      = require(myServerJS + '/opersys'); // Some operating system information
var filesys      = require(myServerJS + '/filesys'); // Some file system information
// simplified printf(1) -  See also: https://en.wikipedia.org/wiki/Printf_format_string
var simpleString = require(myServerJS + '/simpleStringf');  
var loadfile     = require(myServerJS + '/loadfile');       // loads a file
var merge        = require(myServerJS + '/merge-assoc');    // merges associate arrays

// Path to Global HTML files used
var baseHTMLWrapper = myHTML + '/Wrapper.html';
var baseHTMLMenu    = myHTML + '/mainmenu.html';
var baseHTML404     = myHTML + '/404.html';

// These are template files. They work with simpleStringf()
// The files are loaded strings (UTF-8, by default).
var theHTMLWrapper = loadfile.asText(baseHTMLWrapper);
var theHTMLMenu    = loadfile.asText(baseHTMLMenu);
var theHTML404     = loadfile.asText(baseHTML404);
var the404Error    = '404 - Not Found';

// Our active security profile. Asking for something not on this list returns a 404.
var theRESTInterfaces = {'/monitor':true, '/navigate':true , '/system':true};
var theHTMLFiles      = {'/':true, '/index.html':true};
var theOkayDirs       = {'/':true, '/js':true, '/css':true, '/trial':true }
var theIndex          = {'/':true };
// more on security - we only return these file types.
var theBinaries   = {'.ico':'image/x-icon', '.jpg':'image/jpeg', 'png':'image/png'}
var theTexts      = {'.js':'application/javascript', '.css':'text/css', '.html':'text/html', '.txt':'text/plain'};
// INCOMPLETE
//var theDataExchange  = {'.json':'application/javascript', '.jsonp':'application/javascript', '.xml':''};
// This array does double work. 
// 1) It is a flag indicating we handle that file-type/extension.
// 2) It gives us the proper mime-type to use for the HTTP protocol.
var theMimeTypes  = merge.assocArray(theTexts, theBinaries);

/*
*
*	M	A	I	N
*
*/
http.createServer(function (request, response) {
    date = new Date();
    theDateUTC  = date.toUTCString();
    the404Error = '404 - Not Found';

    // Save the logging 
    //console.log("\"%s\" %s %s %s", theDateUTC,  request.method, request.url, request.httpVersion);

    // After parse some useful parameters: auth, pathname, search, query, hash
    // 'true' as the second argument to also parse the query string into object,
    // else returns just a string. 
    theURL = url.parse(request.url, true);

    // Setup all logic states, even if not used in a particular case.
    isREST     = theRESTInterfaces[theURL.pathname];
    isHTML     = theHTMLFiles[theURL.pathname];
    ifOkayDir  = theOkayDirs[path.dirname(theURL.pathname)];
    isIndex  = theIndex[theURL.pathname];
    isBinay  = theBinaries[path.extname(theURL.pathname)];
    isText   = theTexts[path.extname(theURL.pathname)];
    isAnExt    = theMimeTypes[path.extname(theURL.pathname)];
    hasQuery   = theURL.query;
    isMimeType = theMimeTypes[path.extname(theURL.pathname)];
    // Extract any values we may need.
    theExtIs   = (isAnExt) ? path.extname(theURL.pathname) : '';
    theQueryIs = (hasQuery) ? theURL.query : '';
    theMimeIs  = theMimeTypes[theExtIs];

    // NOT WORKING YET - 
    isJSON = false; // look for an incoming JSON request (as a form, possibly)

    // DEBUGGING
    //console.log("theExtIs:%s theQueryIs:%s", theExtIs, JSON.stringify(theQueryIs));

    // Assume we will fail, so we don't have to cover all corner cases.
    is404 = true;
    theDocument = '';
    if (isREST) {
        /*
         * This SECTION is intended as a REST interface and an HTML file.
         * If it gets a JSON request, it returns JSON else an HTML panel.
         */
        basename = path.basename(theURL.pathname, '');
        console.log('REST basename:' + basename);

        if (isJSON) {
            // 
        } else {
            theHTMLStub    = loadfile.asText(myHTML + '/REST.html');
            switch (basename) {
                // RRR: Need add Client & Server Environment values
                case 'system':
                    theHTMLData = opersys.opersys();
                break;
                case 'monitor':
                    theHTMLData = filesys.filesys();
                break;
                // NOTE: This is here so you can setup a new REST interface
                default:
                    theHTMLData = theURL.pathname;
                break;
            }        
            //
            theJScriptPre  = loadfile.asText(myJScriptPre  + '/' + basename +'.js');
            theJScriptPre  = (theJScriptPre) ? theJScriptPre : '';
            //
            theJScriptPost = loadfile.asText(myJScriptPost + '/' + basename +'.js');
            theJScriptPost = (theJScriptPost) ? theJScriptPost : '';

            theHTMLBody = simpleString.b_sprintf(theHTMLStub, [ theHTMLData ]);
            theDocument = simpleString.b_sprintf(theHTMLWrapper, [ theJScriptPre, theHTMLBody , theJScriptPost]);
        }

    } else if (isHTML) {
        /*
         * This SECTION is intended to solely output an HTML file - with our dynamics.
         *
         */
        // ASSUME: a blank "basename" means a slash, and therefore the 'index'.
        basename = path.basename(theURL.pathname, theExtIs);
        basename = (basename) ? basename : 'index';
        //
        theHTMLMenu    = loadfile.asText(myHTML + '/mainmenu.html');
        theHTMLMenu    = (theHTMLMenu) ? theHTMLMenu : '';
        //
        theHTMLBody    = loadfile.asText(myHTML + '/' + basename + '.html');
        theHTMLBody    = (theHTMLBody) ? theHTMLBody : '';
        theHTMLBody    = theHTMLMenu + theHTMLBody;
        //
        theJScriptPre  = loadfile.asText(myJScriptPre  + '/' + basename +'.js');
        theJScriptPre  = (theJScriptPre) ? theJScriptPre : '';
        //
        theJScriptPost = loadfile.asText(myJScriptPost + '/' + basename +'.js');
        theJScriptPost = (theJScriptPost) ? theJScriptPost : '';

        theDocument = simpleString.b_sprintf(theHTMLWrapper, [ theJScriptPre, theHTMLBody , theJScriptPost]);
    } else if (isAnExt) {
        if (ifOkayDir) {
            if (isBinay) {
                theDocument = loadfile.asRaw( myhome + theURL.pathname );
            } else if (isText) {
                theDocument = loadfile.asText( myhome + theURL.pathname );
            } else {
                theDocument = '';
            }
        }
    }

    // (further down) response.write expects a 'String' or a 'Buffer'
    // So resolve, if "null" or "undefined" is returned from a fileload because it (fileload) throws an error.
    theDocument = (theDocument) ? theDocument : '';
    is404       = (theDocument) ? false : true;

    if (is404) {
        theHTMLBody = simpleString.b_sprintf(theHTML404, [ the404Error ] );
        theDocument = simpleString.b_sprintf(theHTMLWrapper, [ theJScript, theHTMLBody , theJScriptPost]);

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
                response.writeHead(200, {'Content-Type': theMimeIs });
            break;
            // NOTE: The 'default' is becauase a REST interface can return an HTML UI, 
            // also the root '/' returns the contents 'index.html'
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


console.log('Server Ver:' + VERSION + ' running at http://127.0.0.1:'+ WEBSERVER_PORT + '/');

