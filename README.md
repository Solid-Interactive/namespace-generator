# Namespace Generator

[![Build Status](https://secure.travis-ci.org/Gozala/namespace.png)](http://travis-ci.org/Solid-Interactive/namespace-generator)

The namespace NPM will take a starting directory and build out objects and modules that are in a given directory structure. The purpose of this module is
so that you can establish a directory for various modules and not have to worry about linking them together. Specifically statically referencing modules in an index.js or something equivalent.



## Usage

myModule.js
```
var namespace = require('solid-namespace');
namespace(path.join(__dirname, '../my-modules'))
    .then(function(ns){
            //`ns` object is fully loaded with an organized object based off of your file system

            //examples (see tests)
            ns['test-start']; //should.equal('lets get ready to rumble');
            ns.dir1.test1(); //should.equal('i am test1');
            ns.dir1.test2.test2a(); //should.equal('i am test2a');
            ns.dir1.test2.test2b(); //should.equal('i am test2b');
            ns.dir2.testa.testa; //should.equal('i am test a');
            ns.dir2.testb.testb; //should.equal('i am test b');
            ns.dir1.subdir1['test-z']; //should.equal('i am test-z');
        });
```

See tests for full example

### Built with love by Solid Digital

Solid is addicted to digital, fanatic about mobile and intrigued by the Internet of things.

At Solid, we create digital products and services that will transform our physical world.

Let's chat
[@http://solid.ws](http://solid.ws)
