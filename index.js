'use strict';

const BB = require('bluebird'),
    glob = BB.promisify(require('glob')),
    path = require('path'),
    objectPath = require('object-path');

// starting path should have forward slashes - https://www.npmjs.com/package/glob#windows
module.exports = function(startingPath, pattern, suffixToRemove){

    pattern = pattern || '/**/*.js';
    suffixToRemove = suffixToRemove || '.js';

    return glob(startingPath + pattern)
        .then(paths => {
            return paths.reduce((namespace, currentPath) => {

                // Store the final object at namespace.ns
                const dirname = path.dirname(currentPath.replace(startingPath, 'ns'));
                const basename = path.basename(currentPath, suffixToRemove).replace(/[.]/g,'_');

                objectPath.set(
                    namespace,
                    (dirname + '/' + basename).split('/').join('.'),
                    require(currentPath)
                );

                return namespace;
            }, {})
        })
        .then(namespace => {
            return namespace.ns
        });

};
