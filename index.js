'use strict';

var BB = require('bluebird'),
    fs = BB.promisifyAll(require('fs')),
    objectPath = require('object-path');

module.exports = function(startingPath){
    var namespace = {};

    var readDir = function(inputDir) {
        var selector = inputDir.replace(startingPath, 'ns').split('/').join('.');

        return fs.readdirAsync(inputDir)
            .map(function(fileName) {
                return fs.statAsync(inputDir + '/' + fileName)
                    .then(function(stat) {
                        if (stat.isFile()) {
                            objectPath.set(
                                namespace,
                                selector + '.' + fileName.replace('.js', ''),
                                require(inputDir + '/' + fileName)
                            );
                        }
                        if (stat.isDirectory()) {
                            return readDir(inputDir + '/' + fileName).then(function(directory) { return directory; });
                        }
                    });
            });
    };

    return readDir(startingPath, namespace).then(function(){
                return namespace.ns;
            });
};
