'use strict';

/**
 * @ngdoc function
 * @name weberApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weberApp
 */
angular.module('weberApp')
	.controller('MainCtrl', function($scope, $auth, Restangular, InfinitePosts, $alert, $http, CurrentUser, UserService) {
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

				var params = '{"_id": {"$in":["'+($scope.user.friends).join('", "') + '"'+']}}'

				console.log(params)
				if (user.friends.length !== 0) {
					Restangular.all('people').getList({where :params}).then(function(friend) {
						$scope.friends = friend;
					});
				}
				$scope.submit_post = function(){

					$http({
						url: '/similarwords',
						method: "GET",
						params: {new_post: $scope.new_post}
					})
					.success(function(similarwords) {
						console.log(similarwords);


					$scope.infinitePosts.addPost($scope.new_post,similarwords);
					$scope.new_post = '';
					});
				};
			});
		});
	});