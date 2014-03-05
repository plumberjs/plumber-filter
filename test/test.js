require('should');

var runOperation = require('plumber-util-test').runOperation;

var Resource = require('plumber').Resource;

var filter = require('..');

function createResource(params) {
  return new Resource(params);
}


describe('filter', function(){
  var resources;

  beforeEach(function() {
    resources = [
      createResource({type: 'javascript', path: 'path/to/file.js'}),
      createResource({type: 'css',        path: 'path/to/file.css'})
    ];
  });


  it('should be a function', function(){
    filter.should.be.type('function');
  });

  it('should let all resources through by default', function(done){
    runOperation(filter, resources).resources.toArray(function(filtered) {
      filtered.length.should.equal(2);
      filtered[0].should.equal(resources[0]);
      filtered[1].should.equal(resources[1]);
      done();
    });
  });


  describe('#type', function() {
    it('should be a function', function(){
      filter.type.should.be.type('function');
    });

    it('should filter resources by type', function(done){
      runOperation(filter.type('javascript'), resources).resources.toArray(function(filtered) {
        filtered.length.should.equal(1);
        filtered[0].should.equal(resources[0]);
        done();
      });
    });
  });


  describe('#not', function() {
    it('should be a function', function(){
      filter.not.should.be.type('function');
      filter.type('javascript').not.should.be.type('function');
    });

    it('should invert a type filter when used as prefix', function(done){
      runOperation(filter.not.type('javascript'), resources).resources.toArray(function(filtered) {
        filtered.length.should.equal(1);
        filtered[0].should.equal(resources[1]);
        done();
      });
    });

    it('should invert a type filter when used as postfix', function(done){
      runOperation(filter.type('javascript').not, resources).resources.toArray(function(filtered) {
        filtered.length.should.equal(1);
        filtered[0].should.equal(resources[1]);
        done();
      });
    });
  });

});
