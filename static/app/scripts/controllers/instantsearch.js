'use strict';

/**
 * @ngdoc function
 * @name weberApp.controller:InstantsearchCtrl
 * @description
 * # InstantsearchCtrl
 * Controller of the weberApp
 */
angular.module('weberApp')
  .controller('InstantsearchCtrl', function ($scope, $routeParams, $location, Restangular,$http,$auth) {

   $scope.$watch('search', function() {

   });

   $scope.searching = function(){

   console.log($scope.search)
   console.log($scope.search.split(" "))

   var params = '{"keywords": {"$in":["'+($scope.search.split(" "))+'"]}}'
   console.log(params)


   Restangular.all('people/posts').getList({where :params}).then(function(data) {
						$scope.results = data




					});
				/*if (user.friends.length !== 0) {
					Restangular.all('people').getList({where :params}).then(function(friend) {
						$scope.friends = friend;
					});
				}

        $http({
            url: '/getsearch',
            method: "GET",
            params: {searchtext: $scope.search}
            })
            .success(function(data) {
                    console.log(data);
		    });*/
        };

      $scope.searchSubmit = function(){
					$location.path("/search").search({q: $scope.search});
			};
    
  });

