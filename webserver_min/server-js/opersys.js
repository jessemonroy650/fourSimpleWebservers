//
//
//
var os = require('os');

exports.opersys = function() {
    var tmpdir = os.tmpdir()
    var endianness = os.endianness()
    var hostname = os.hostname()
    var type = os.type()
    var platform = os.platform()
    var arch = os.arch()
    var release = os.release()
    var uptime = os.uptime()

    var loadavg = JSON.stringify(os.loadavg()) + "<br />"
    var totalmem = os.totalmem()
    var freemem = os.freemem()
    var cpus = JSON.stringify(os.cpus()) + "<br />"
    var networkInterfaces = JSON.stringify(os.networkInterfaces()) + "<br />"

    var opersysString = 
        "hostname:<b>" + hostname + "</b><br />" +
        "tmpdir:" + tmpdir + "<br />" +
        "endianness:" + endianness + "<br />" +
        "type:" + type + "<br />" +
        "platform:" + platform + "<br />" +
        "arch:" + arch + "<br />" +
        "release:" + release + "<br />" +
        "uptime:" + uptime + "<br />"  +
        "loadavg:" + loadavg + "<br />"  +
        "totalmem:" + totalmem + "<br />"  +
        "freemem:" + freemem + "<br />"  +
        "cpus:" + cpus + "<br />"  +
        "networkInterfaces:" + networkInterfaces + "<br />";

    return opersysString;
}