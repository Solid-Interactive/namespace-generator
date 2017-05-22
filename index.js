'use strict';

const BB = require('bluebird'),
    glob = BB.promisify(require('glob')),
    path = require('path'),
    objectPath = require('object-path');

// starting path should have forward slashes - https://www.npmjs.com/package/glob#windows
module.exports = namespaceGenerator;
module.exports.sync = namespaceGeneratorSync;

function namespaceGenerator(startingPath, pattern, suffixToRemove){

    pattern = pattern || '/**/*.js';
    suffixToRemove = suffixToRemove || '.js';

    return glob(startingPath + pattern)
        .then(curryHandlePaths(startingPath, suffixToRemove))
        .then(namespace => {
            return namespace.ns
        })
        .catch(function(err) {
            console.log(err);
            // don't swallow errors
            throw err;
        });

}

function namespaceGeneratorSync(startingPath, pattern, suffixToRemove){

    pattern = pattern || '/**/*.js';
    suffixToRemove = suffixToRemove || '.js';

    let paths = glob.sync(startingPath + pattern);
    let namespace = curryHandlePaths(startingPath, suffixToRemove)(paths);
    return namespace.ns;
}

function curryHandlePaths(startingPath, suffixToRemove) {
    return paths => {
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
    };
}
