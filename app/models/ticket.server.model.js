'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ticket Schema
 */
var TicketSchema = new Schema({

	firstName: {
		type: String,
		default: '',
		trim: true
	},
	lastName: {
		type: String,
		default: '',
		trim: true
	},
	referred: {
		type: Boolean,
		default: false
	},
	price: {
		type: Number,
		default: 85
	},
	barcode: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Ticket', TicketSchema);