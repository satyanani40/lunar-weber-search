'use strict';

describe('Service: authsvc', function () {

  // load the service's module
  beforeEach(module('weberApp'));

  // instantiate service
  var authsvc;
  beforeEach(inject(function (_authsvc_) {
    authsvc = _authsvc_;
  }));

  it('should do something', function () {
    expect(!!authsvc).toBe(true);
  });

});
