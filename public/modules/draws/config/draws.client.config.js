'use strict';

// Configuring the Articles module
angular.module('draws').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Draws', 'draws', 'dropdown', '/draws(/create)?', false, ['admin']);
		Menus.addSubMenuItem('topbar', 'draws', 'List Draws', 'draws');
		Menus.addSubMenuItem('topbar', 'draws', 'New Draw', 'draws/create');
	}
]);