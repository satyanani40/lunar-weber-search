'use strict';

/**
 * @ngdoc function
 * @name weberApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the weberApp
 */
angular.module('weberApp')
	.controller('NavbarCtrl', function($scope, $auth, CurrentUser, $alert, $location) {
		$scope.currentUser = CurrentUser;
		$scope.dropdown = [{
			"text": "Another action",
			"href": "#anotherAction"
		}, {
			"text": "Display an alert",
			"click": "$alert('Holy guacamole!')"
		}, {
			"text": "External link",
			"href": "/auth/facebook",
			"target": "_self"
		}, {
			"divider": true
		}, {
			"text": "Logout",
			"click": "logout()"
		}];
		$scope.logout = function() {
			CurrentUser.reset();
			$auth.logout();
			$location.path("/login");
		};
		$scope.isAuthenticated = function() {
			return $auth.isAuthenticated();
		};
	});