'use strict';

describe('Controller: InstantsearchCtrl', function () {

  // load the controller's module
  beforeEach(module('weberApp'));

  var InstantsearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstantsearchCtrl = $controller('InstantsearchCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
