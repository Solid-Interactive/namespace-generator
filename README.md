# Namespace Generator

[![Build Status](https://secure.travis-ci.org/Gozala/namespace.png)](http://travis-ci.org/Solid-Interactive/namespace-generator)

The namespace NPM will take a starting directory and build out objects and modules that are in a given directory structure. The purpose of this module is
so that you can establish a directory for various modules and not have to worry about linking them together. Specifically statically referencing modules in an index.js or something equivalent.

This module can be used both asynchronously or synchronously.

The start path should contain all forward slashes, since the module uses [glob](https://www.npmjs.com/package/glob#windows).

## Aysnc Usage

myModule.js
```
let namespace = require('solid-namespace');
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
        })
        .catch(e => {
            // be notified of and handle any errors
            console.log('e',e);
        });
```

## Sync Usage

myModule.js
```
let namespace = require('solid-namespace');
let ns = namespace.sync(path.join(__dirname, '../my-modules'))
//`ns` object is fully loaded with an organized object based off of your file system

//examples (see tests)
ns['test-start']; //should.equal('lets get ready to rumble');
ns.dir1.test1(); //should.equal('i am test1');
ns.dir1.test2.test2a(); //should.equal('i am test2a');
ns.dir1.test2.test2b(); //should.equal('i am test2b');
ns.dir2.testa.testa; //should.equal('i am test a');
ns.dir2.testb.testb; //should.equal('i am test b');
ns.dir1.subdir1['test-z']; //should.equal('i am test-z');
```

See tests for full example.

Note that any `.` in the filename after removing the suffix are turned into `_`. This is becuase otherwise they would result
in nested objects. For example `this.file.js` would be turned into the key `this_file`.

## Options

By default the module takes all `.js` files and composes and object out of them. You can optionally pass an alternative
glob expression, and an optional suffix to remove to create the keys. The globe expression should begin with a forward slash.

e.g.:

```
services
    some.service.js
    index.js
    email
        send.service.js
```

Running `namespace(path.join(__dirname, 'services'), '/**/*.service.js', '.service.js')` would project an object with the keys:

```json
{
    "some" : "",
    "email": {
        "send" : ""
    }
}
```

### Built with love by Solid Digital

Solid is addicted to digital, fanatic about mobile and intrigued by the Internet of things.

At Solid, we create digital products and services that will transform our physical world.

Let's chat
[@http://solid.ws](http://solid.ws)
