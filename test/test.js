require('should');

var runAndCompleteWith = require('plumber-util-test').runAndCompleteWith;

var Resource = require('plumber').Resource;

var filter = require('..');

function createResource(params) {
  return new Resource(params);
}

function resourcesError() {
  chai.assert(false, "error in resources observable");
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
    runAndCompleteWith(filter, resources, function(filtered) {
      filtered.length.should.equal(2);
      filtered[0].should.equal(resources[0]);
      filtered[1].should.equal(resources[1]);
    }, resourcesError, done);
  });


  describe('#type', function() {
    it('should be a function', function(){
      filter.type.should.be.type('function');
    });

    it('should filter resources by type', function(done){
      runAndCompleteWith(filter.type('javascript'), resources, function(filtered) {
        filtered.length.should.equal(1);
        filtered[0].should.equal(resources[0]);
      }, resourcesError, done);
    });
  });


  describe('#not', function() {
    it('should be a function', function(){
      filter.not.should.be.type('function');
      filter.type('javascript').not.should.be.type('function');
    });

    it('should invert a type filter when used as prefix', function(done){
      runAndCompleteWith(filter.not.type('javascript'), resources, function(filtered) {
        filtered.length.should.equal(1);
        filtered[0].should.equal(resources[1]);
      }, resourcesError, done);
    });

    it('should invert a type filter when used as postfix', function(done){
      runAndCompleteWith(filter.type('javascript').not, resources, function(filtered) {
        filtered.length.should.equal(1);
        filtered[0].should.equal(resources[1]);
      }, resourcesError, done);
    });
  });

});
