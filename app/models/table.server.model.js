'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Table Schema
 */
var TableSchema = new Schema({
	id: {
		type: Number,
		min: 1,
		max: 50
	},
	created: {
		type: Date,
		default: Date.now
	},
	tickets: {
	    type: [{
	      type: Schema.ObjectId,
	      ref: 'Ticket'
	    }],
	    validate: [arrayLimit, '{PATH} exceeds the limit of 10']
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});
function arrayLimit(val) {
  return val.length <= 10;
}

mongoose.model('Table', TableSchema);