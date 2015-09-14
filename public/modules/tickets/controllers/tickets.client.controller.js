'use strict';

// Tickets controller

var app =angular.module('tickets');
app.controller('TicketsController', ['$scope','$http', '$stateParams', '$location', 'Authentication', 'Tickets',
	function($scope, $http, $stateParams, $location, Authentication, Tickets) {
		$scope.authentication = Authentication;
		// $scope.tables=[];

		// for (var i=1;i<=50;i++) {
		// 	$scope.tables.push(i);
		// }

		// Create new Ticket
		$scope.create = function() {
			var refer = ['8888','6666'];
			// Create new Ticket object
			var ticket = new Tickets ({
				firstName: this.firstName,
				lastName: this.lastName,
				tableId: this.table,
				token: this.token,
				barcode: Math.floor(Math.random() * (1000000000000 - 100000000000)) + 100000000000

			});
				for (var ref in refer) {
						if (refer[ref] === this.refercode){
						ticket.referred = true;	
						ticket.price = 75;
					}
				}
			

			var expiryDate = this.expiry.split('/');
			var card = {
				"number": this.number,
				"expMonth": expiryDate[0],
				"expYear": expiryDate[1],
				"receiptEmail": $scope.authentication.user.email
			}
			var req = {
			 method: 'POST',
			 url: 'http://gateway.nhccareer.com:8080/gala/rest/charge',
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: card
			}

			$http(req).then(function(response) {
			    // this callback will be called asynchronously
			    // when the response is available
			    $scope.error = 'ticket purchased!';
							// Redirect after save
				ticket.$save(function(response) {
					$location.path('tickets/' + response._id);

					// Clear form fields
					$scope.firstName = '';
					$scope.lastName = '';
					$scope.refercode = '';
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			}, function(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			    $scope.error = response;
			});
			
		};

		// Remove existing Ticket
		$scope.remove = function(ticket) {
			if ( ticket ) { 
				ticket.$remove();

				for (var i in $scope.tickets) {
					if ($scope.tickets [i] === ticket) {
						$scope.tickets.splice(i, 1);
					}
				}
			} else {
				$scope.ticket.$remove(function() {
					$location.path('tickets');
				});
			}
		};
		// Update existing Ticket
		$scope.update = function() {
			var ticket = $scope.ticket;

			ticket.$update(function() {
				$location.path('tickets/' + ticket._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Tickets
		$scope.find = function() {
			$scope.queryResult = Tickets.query(function(){
				$scope.tickets = $scope.queryResult[0];
				$scope.tables = $scope.queryResult[1];
			});
		};

		// Find existing Ticket
		$scope.findOne = function() {
			$scope.ticket = Tickets.get({ 
				ticketId: $stateParams.ticketId
			});
		};
	}
]);




