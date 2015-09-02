'use strict';

// Configuring the Articles module
angular.module('draws').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Lucky Draws', 'draws', 'dropdown', '/draws(/create)?', false, ['admin']);
		Menus.addSubMenuItem('topbar', 'draws', 'List all user', 'draws');
		Menus.addSubMenuItem('topbar', 'draws', 'Lucky draw', 'draws/create');
	}
]);