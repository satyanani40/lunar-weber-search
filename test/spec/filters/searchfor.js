'use strict';

describe('Filter: searchFor', function () {

  // load the filter's module
  beforeEach(module('weberApp'));

  // initialize a new instance of the filter before each test
  var searchFor;
  beforeEach(inject(function ($filter) {
    searchFor = $filter('searchFor');
  }));

  it('should return the input prefixed with "searchFor filter:"', function () {
    var text = 'angularjs';
    expect(searchFor(text)).toBe('searchFor filter: ' + text);
  });

});
