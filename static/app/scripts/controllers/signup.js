'use strict';

/**
 * @ngdoc function
 * @name weberApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the weberApp
 */
angular.module('weberApp')
	.controller('SignupCtrl', function($scope, $auth) {
		$scope.registerUser = function() {
			$auth.signup({
				email: $scope.email,
				password: $scope.password
			}).then(function(response) {
				console.log(response.data);
			});
		};
	});