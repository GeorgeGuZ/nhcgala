'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var tickets = require('../../app/controllers/tickets.server.controller');

	// Tickets Routes
	app.route('/tickets')
		.get(tickets.list)
		.post(users.requiresLogin, tickets.create);

	app.route('/tickets/:ticketId')
		.get(tickets.read)
		.put(users.requiresLogin, tickets.hasAuthorization, tickets.update)
		.delete(users.requiresLogin, tickets.hasAuthorization, tickets.delete);

	// Finish by binding the Ticket middleware
	app.param('ticketId', tickets.ticketByID);
};
