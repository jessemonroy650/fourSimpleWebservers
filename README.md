# Four (4) Simple Webserver #
Date: 2014-05-02


Four (4) simple webserver written in javascript - fit for lightweight production.


In learning Javascript and node.js, I applied what I know about application development. As such, the code forms an evolution of knowlegde, but also of sophisication in design. The four servers from the old to the newest include: 

* webserver_main/main.njs   - hard pages & REST w/simpleStringf
* webserver_pre/premain.njs - hard pages & REST w/simpleStringf
* webserver_min/minweb.njs  - minimual webserver
* webserver_fin/httpd.njs   - webserver & REST w/simpleStringf

First some basics on the features. All the system-oriented features are broken into modules, like (opersys: operation system, filesys: file system, resolvext: resolve external files type - like jpg, js, html). Next, three (3) of the four(4) version can server dynamic webpages, via templages. All the servers follow a basic pattern:

# accept socket connect
# load static components, including templates, date and time, and other *state trees*
# resolve internal state logic and assign the states to booleans
# load dynamic components, including webpages or binary blobs
# resolve component state (http 200, 404, or other)
# output the component
# finally log output

## main.js ##

## premain.js ##

## minweb.js ##

## http.js ##


