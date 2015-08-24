'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var draws = require('../../app/controllers/draws.server.controller');

	// Draws Routes
	app.route('/draws')
		.get(draws.list)
		.post(users.requiresLogin, draws.create);

	app.route('/draws/:drawId')
		.get(draws.read)
		.put(users.requiresLogin, draws.hasAuthorization, draws.update)
		.delete(users.requiresLogin, draws.hasAuthorization, draws.delete);

	// Finish by binding the Draw middleware
	app.param('drawId', draws.drawByID);
};
