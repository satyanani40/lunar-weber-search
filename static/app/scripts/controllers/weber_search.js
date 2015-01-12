'use strict';

/**
 * @ngdoc function
 * @name weberApp.controller:WeberSearchCtrl
 * @description
 * # WeberSearchCtrl
 * Controller of the weberApp
 */
angular.module('weberApp')
	.controller('WeberSearchCtrl', function($scope, $auth, Restangular, InfinitePosts, $alert, $http, CurrentUser, UserService) {
		$scope.UserService = UserService;

		$http.get('/api/me', {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': $auth.getToken()
			}
		}).success(function(user_id) {
			Restangular.one('people',JSON.parse(user_id)).get().then(function(user) {
				$scope.user = user;
				$scope.infinitePosts = new InfinitePosts(user);


			});
		});
        $scope.searching = function(){

               console.log($scope.search)
               console.log($scope.search.split(" "))

               var params = '{"keywords": {"$in":["'+($scope.search.split(" "))+'"]}}'
               console.log(params)
               Restangular.all('people/posts').getList({where :params}).then(function(data) {
                                    $scope.results = data
                            });
                    };
	});