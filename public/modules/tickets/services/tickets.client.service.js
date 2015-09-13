'use strict';

//Tickets service used to communicate Tickets REST endpoints
angular.module('tickets').factory('Tickets', ['$resource',
	function($resource) {
		return $resource('tickets/:ticketId', { ticketId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

Stripe.setPublishableKey('pk_test_DPkgRrpdmy4BOQkstp6o0z20')

angular.module('app', ['angularPayments'])

MainController = function($scope){
  $scope.handleStripe = function(status, response){
    if(response.error) {
      // there was an error. Fix it.
    } else {
      // got stripe token, now charge it or smt
      var token = response.id
    }
  }
}