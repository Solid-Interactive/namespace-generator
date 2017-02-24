'use strict';

var namespace = require('../index');
var path = require('path');
var chai = require('chai');

chai.should();

describe('Namespace: Async: Promise', function() {
    it('Load all of the modules in a directory into the root namespace', function(done) {
        var name = 'solid',
            dir = path.join(__dirname, '../test-scaffolding');

        namespace(name, dir)
            .then(function(ns){
                ns.solid['test-start'].should.equal('lets get ready to rumble');
                ns.solid.dir1.test1().should.equal('i am test1');
                ns.solid.dir1.test2.test2a().should.equal('i am test2a');
                ns.solid.dir1.test2.test2b().should.equal('i am test2b');
                ns.solid.dir2.testa.testa.should.equal('i am test a');
                ns.solid.dir2.testb.testb.should.equal('i am test b');
                ns.solid.dir1.subdir1['test-z'].should.equal('i am test-z');
                done();
            })
            .catch(function(err){
                console.log(err);
                done();
            });
    });
});
