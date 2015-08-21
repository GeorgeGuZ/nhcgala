'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.menus = [
			{
				icon: "glyphicon glyphicon-user",
				color: "btn btn-success",
				title: "Register",
				description: "Get a valid ID for event activities"
			},
			{
				icon: "glyphicon glyphicon-calendar",
				color: "btn btn-warning",
				title: "Event Preview",
				description: "See what's awesome in our event"
			},
			{
				icon: "glyphicon glyphicon-shopping-cart",
				color: "btn btn-info",
				title: "Buy Ticket",
				description: "Pay with Paypal"
			},
			{
				icon: "glyphicon glyphicon-barcode",
				color: "btn btn-danger",
				title: "My Ticket",
				description: "Want a barcode? Here!"
			}
		];
	}
]);