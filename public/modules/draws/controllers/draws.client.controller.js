'use strict';

// Draws controller
angular.module('draws').controller('DrawsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Draws',
	function($scope, $stateParams, $location, Authentication, Draws) {
		$scope.authentication = Authentication;

		// Create new Draw
		$scope.create = function() {
			// Create new Draw object
			var draw = new Draws ({
				name: this.name
			});

			// Redirect after save
			draw.$save(function(response) {
				$location.path('draws/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Draw
		$scope.remove = function(draw) {
			if ( draw ) { 
				draw.$remove();

				for (var i in $scope.draws) {
					if ($scope.draws [i] === draw) {
						$scope.draws.splice(i, 1);
					}
				}
			} else {
				$scope.draw.$remove(function() {
					$location.path('draws');
				});
			}
		};

		// Update existing Draw
		$scope.update = function() {
			var draw = $scope.draw;

			draw.$update(function() {
				$location.path('draws/' + draw._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Draws
		$scope.find = function() {
			$scope.draws = Draws.query();
		};

		// Find existing Draw
		$scope.findOne = function() {
			$scope.draw = Draws.get({ 
				drawId: $stateParams.drawId
			});
		};
	}
]);