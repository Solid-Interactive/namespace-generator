'use strict';

var namespace = require('../index');
var path = require('path');
var chai = require('chai');

chai.should();

describe('Namespace: Sync', function() {
    it('Load all of the modules in a directory into the root namespace using default options', function() {
        let dir = path.join(__dirname, '..', 'test-scaffolding');

        let solid = namespace.sync(dir);

        solid['test-start'].should.equal('lets get ready to rumble');
        solid.dir1.test1().should.equal('i am test1');
        solid.dir1.test2.test2a().should.equal('i am test2a');
        solid.dir1.test2.test2b().should.equal('i am test2b');
        solid.dir2.testa.testa.should.equal('i am test a');
        solid.dir2.testb.testb.should.equal('i am test b');
        solid.dir1.subdir1['test-z'].should.equal('i am test-z');
    });
    it('Load all of the modules in a directory into the root namespace using custom options', function() {
        let dir = path.join(__dirname, '..', 'test-scaffolding-custom');

        let solid = namespace.sync(dir, '/**/*.service.js', '.service.js')
        solid.should.deep.equal({
            'jobs' : 'jobs',
            email : {
                'send' : 'send',
                'to_cc': 'do not nest under email.to'
            }
        });
    });
});
