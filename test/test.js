require('should');

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

  it('should let all resources through by default', function(){
    var filtered = filter(resources);
    filtered.length.should.equal(2);
    filtered[0].should.equal(resources[0]);
    filtered[1].should.equal(resources[1]);
  });


  describe('#type', function() {
    it('should be a function', function(){
      filter.type.should.be.type('function');
    });

    it('should filter resources by type', function(){
      var filtered = filter.type('javascript')(resources);
      filtered.length.should.equal(1);
      filtered[0].should.equal(resources[0]);
    });
  });


  describe('#not', function() {
    it('should be a function', function(){
      filter.not.should.be.type('function');
      filter.type('javascript').not.should.be.type('function');
    });

    it('should invert a type filter when used as prefix', function(){
      var filtered = filter.not.type('javascript')(resources);
      filtered.length.should.equal(1);
      filtered[0].should.equal(resources[1]);
    });

    it('should invert a type filter when used as postfix', function(){
      var filtered = filter.type('javascript').not(resources);
      filtered.length.should.equal(1);
      filtered[0].should.equal(resources[1]);
    });
  });

});
