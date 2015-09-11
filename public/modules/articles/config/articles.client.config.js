'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Games', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'Game Result', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'Post an Answer', 'articles/create');
	}
]);