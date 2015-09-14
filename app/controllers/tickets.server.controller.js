'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Ticket = mongoose.model('Ticket'),
	Table = mongoose.model('Table'),
	_ = require('lodash');

/**
 * Create a Ticket
 */
exports.create = function(req, res) {
	var ticket = new Ticket(req.body);
	ticket.user = req.user;

	var table = Table.findOne({
		id: ticket.tableId
	},function(err, selectedTable){

			selectedTable.tickets.push(ticket._id);
			selectedTable.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} 
		});
	});

	ticket.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ticket);
		}
	});
};

/**
 * Show the current Ticket
 */
exports.read = function(req, res) {
	res.jsonp(req.ticket);
};

/**
 * Update a Ticket
 */
exports.update = function(req, res) {
	var ticket = req.ticket ;

	ticket = _.extend(ticket , req.body);

	ticket.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ticket);
		}
	});
};

/**
 * Delete an Ticket
 */
exports.delete = function(req, res) {
	var ticket = req.ticket ;
	var table = Table.findOne({
		id: ticket.tableId
	},function(err, selectedTable){
			for(var i = selectedTable.tickets.length - 1; i >= 0; i--) {
			    if(_.isEqual(selectedTable.tickets[i],ticket._id)) {
			       selectedTable.tickets.splice(i, 1);
			    }
			}
			
			selectedTable.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} 
		});
	});
	ticket.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ticket);
		}
	});
};

/**
 * List of Tickets
 */
exports.list = function(req, res) { 
	Ticket.find().sort('-created').populate('user', 'displayName').exec(function(err, tickets) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			Table.find().populate('user', 'displayName').exec(function(err,tables){
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				}else {
					// if (req.body.list === true) {
						// res.jsonp(tickets);
					// }
					// else {
					// 	res.jsonp(tables);
					// }
					// res.jsonp({'listticket': tickets, 'listtable': tables});
					res.jsonp([tickets,tables][0]);
				}

			});
			// res.jsonp(tickets);
		}
	});
};

/**
 * Ticket middleware
 */
exports.ticketByID = function(req, res, next, id) { 
	Ticket.findById(id).populate('user', 'displayName').exec(function(err, ticket) {
		if (err) return next(err);
		if (! ticket) return next(new Error('Failed to load Ticket ' + id));
		req.ticket = ticket ;
		next();
	});
};

/**
 * Ticket authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.ticket.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
