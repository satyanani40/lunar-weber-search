'use strict';

/**
 * @ngdoc function
 * @name weberApp.controller:UserprofileCtrl
 * @description
 * # UserprofileCtrl
 * Controller of the weberApp
 */
angular.module('weberApp')
	.controller('UserprofileCtrl', function($scope, $routeParams, Restangular, InfinitePosts, CurrentUser, UserService) {
		
		$scope.UserService = UserService;

		var user_obj = Restangular.one('people', $routeParams.username);
		user_obj.get().then(function(user) {
			$scope.user = user;
			$scope.addFriend = function() {
				$scope.user.patch({
					'notifications': {
						'friend-requests': [CurrentUser.userId]
					}
				});
			};
			$scope.infinitePosts = new InfinitePosts(user_obj);
			//get all friends
			if (user.friends.length !== 0) {
				Restangular.all('people').getList({
					where: {
						"_id": {
							"$in": $scope.user.friends
						}
					}
				}).then(function(friends) {
					$scope.friends = friends;
				});
			}
		});
	});