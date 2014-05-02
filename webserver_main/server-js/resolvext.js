/*
 * Date: 2014-04-02
 * Returns: true or false base on query
 *
 */

resolvExt = require('path');

exports.isExt = function(filename, ext) {
    xyz = resolvExt.extname(filename);
    return ( xyz === ext ) ? true : false;
}
