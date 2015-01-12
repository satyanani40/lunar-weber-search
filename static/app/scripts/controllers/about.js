'use strict';

/**
 * @ngdoc function
 * @name weberApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the weberApp
 */
angular.module('weberApp')
	.controller('AboutCtrl', function($scope, Restangular, esFactory, ESClient, $routeParams, UserService) {
		
		$scope.UserService = UserService;
		$scope.search = $routeParams.q;

			ESClient.search({
				q: $routeParams.q
			}).then(function(body) {
				$scope.hits = body.hits.hits;
			}, function(error) {
				console.trace(error.message);
			});

		var users = Restangular.all('people');
		users.getList().then(function(users) {
			$scope.users = users;
		});
	});