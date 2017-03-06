'use strict';

var namespace = require('../index');
var path = require('path');
var chai = require('chai');

chai.should();

describe('Namespace: Async: Promise', function() {
    it('Load all of the modules in a directory into the root namespace using default options', function(done) {
        let dir = path.join(__dirname, '..', 'test-scaffolding');

        namespace(dir)
            .then(function(solid){

                solid['test-start'].should.equal('lets get ready to rumble');
                solid.dir1.test1().should.equal('i am test1');
                solid.dir1.test2.test2a().should.equal('i am test2a');
                solid.dir1.test2.test2b().should.equal('i am test2b');
                solid.dir2.testa.testa.should.equal('i am test a');
                solid.dir2.testb.testb.should.equal('i am test b');
                solid.dir1.subdir1['test-z'].should.equal('i am test-z');
                done();
            })
            .catch(function(err){
                done(err);
            });
    });
    it('Load all of the modules in a directory into the root namespace using custom options', function(done) {
        let dir = path.join(__dirname, '..', 'test-scaffolding-custom');

        namespace(dir, '/**/*.service.js', '.service.js')
            .then(function(solid){
                solid.should.deep.equal({
                    'jobs' : 'jobs',
                    email : {
                        'send' : 'send',
                        'to_cc': 'do not nest under email.to'
                    }
                });
                done();
            })
            .catch(function(err){
                done(err);
            });
    });
});
