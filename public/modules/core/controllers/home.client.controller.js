'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		
		if ($scope.authentication.user){
			$scope.menus = [
			{
				icon: 'glyphicon glyphicon-user',
				color: 'btn btn-success',
				title: 'Sign out',
				url: '/auth/signout',
				description: 'Remember to Sign out'
			},
			{
				icon: 'glyphicon glyphicon-calendar',
				color: 'btn btn-warning',
				title: 'Event Preview',
				url: '/#!/event',
				description: 'See whats awesome about our event'
			},
			{
				icon: 'glyphicon glyphicon-shopping-cart',
				color: 'btn btn-info',
				title: 'Buy Ticket',
				url: '/#!/tickets/create',
				description: 'Get a ticket for free'
			},
			{
				icon: 'glyphicon glyphicon-barcode',
				color: 'btn btn-danger',
				title: 'My Ticket',
				url: '/#!/tickets',
				description: 'Want a barcode? Here!'
			}
			];
			if($scope.authentication.user.roles[0] === 'admin'){
				$scope.menus.push({
					icon: 'glyphicon glyphicon-gift',
					color: 'btn btn-primary',
					title: 'Lucky Draw',
					url: '/#!/draws',
					description: 'who is the luckiest tonight?'
				});
			}
		}
		else {
			$scope.menus = [
			{
				icon: 'glyphicon glyphicon-user',
				color: 'btn btn-danger',
				title: 'Sign in',
				url: '/#!/signin',
				description: 'Sign in to get your info'
			},
			{
				icon: 'glyphicon glyphicon-user',
				color: 'btn btn-success',
				title: 'Register',
				url: '/#!/signup',
				description: 'Get a valid ID for NHC Gala'
			},
			{
				icon: 'glyphicon glyphicon-calendar',
				color: 'btn btn-warning',
				title: 'Event Preview',
				url: '/#!/event',
				description: 'See whats awesome about our event'
			},
			{
				icon: 'glyphicon glyphicon-shopping-cart',
				color: 'btn btn-info',
				title: 'Buy Ticket',
				url: '/#!/signin',
				description: 'Get a ticket for free'
			},
			
		];
		}
		
	}
]);