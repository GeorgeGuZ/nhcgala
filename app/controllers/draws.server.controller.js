'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Draw = mongoose.model('Draw'),
	User = mongoose.model('User'),
	_ = require('lodash');

/**
 * Create a Draw
 */
exports.create = function(req, res) {
	var draw = new Draw(req.body);
	draw.user = req.user;

	draw.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(draw);
		}
	});
};

/**
 * Show the current Draw
 */
exports.read = function(req, res) {
	res.jsonp(req.draw);
};

/**
 * Update a Draw
 */
exports.update = function(req, res) {
	var draw = req.draw ;

	draw = _.extend(draw , req.body);

	draw.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(draw);
		}
	});
};

/**
 * Delete an Draw
 */
exports.delete = function(req, res) {
	var draw = req.draw ;

	draw.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(draw);
		}
	});
};

/**
 * List of Draws
 */
// exports.list = function(req, res) { 
// 	Draw.find().sort('-created').populate('user', 'displayName').exec(function(err, draws) {
// 		if (err) {
// 			return res.status(400).send({
// 				message: errorHandler.getErrorMessage(err)
// 			});
// 		} else {
// 			res.jsonp(draws);
// 		}
// 	});
// };

exports.list = function(req, res) { 
	User.find().where('roles').equals(['user']).sort('-created').exec(function(err, draws) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(draws);
		}
	});
};
/**
 * Draw middleware
 */
exports.drawByID = function(req, res, next, id) { 
	Draw.findById(id).populate('user', 'displayName').exec(function(err, draw) {
		if (err) return next(err);
		if (! draw) return next(new Error('Failed to load Draw ' + id));
		req.draw = draw ;
		next();
	});
};

/**
 * Draw authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.draw.user.roles[0]!=='admin') {
		return res.status(403).send('User is not authorized');
	}
	next();
};
