'use strict';

describe('Service: weberService', function () {

  // load the service's module
  beforeEach(module('weberApp'));

  // instantiate service
  var weberService;
  beforeEach(inject(function (_weberService_) {
    weberService = _weberService_;
  }));

  it('should do something', function () {
    expect(!!weberService).toBe(true);
  });

});
