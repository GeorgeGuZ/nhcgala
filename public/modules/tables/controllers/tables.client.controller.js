'use strict';

// Tables controller
angular.module('tables').controller('TablesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tables',
	function($scope, $stateParams, $location, Authentication, Tables) {
		$scope.authentication = Authentication;

		// Create new Table
		$scope.create = function() {
			// Create new Table object
			var table = new Tables ({
				id: this.id
			});

			// Redirect after save
			table.$save(function(response) {
				$location.path('tables/' + response._id);

				// Clear form fields
				$scope.id = '';
			}, function(errorResponse) {

				$scope.error = errorResponse.data.message;

			});
		};

		// Remove existing Table
		$scope.remove = function(table) {
			if ( table ) { 
				table.$remove();

				for (var i in $scope.tables) {
					if ($scope.tables [i] === table) {
						$scope.tables.splice(i, 1);
					}
				}
			} else {
				$scope.table.$remove(function() {
					$location.path('tables');
				});
			}
		};

		// Update existing Table
		$scope.update = function() {
			var table = $scope.table;

			table.$update(function() {
				$location.path('tables/' + table._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Tables
		$scope.find = function() {
			$scope.tables = Tables.query();
		};

		// Find existing Table
		$scope.findOne = function() {
			$scope.table = Tables.get({ 
				tableId: $stateParams.tableId
			});
		};
	}
]);