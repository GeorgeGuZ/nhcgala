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
	table: {
		type: Number
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

// var TableSchema = new Schema({

// 	tableID: {
// 		type: Number,
// 		min: 1,
// 		max: 50
// 	},
// 	tickets: {
//     type: [{
//       type: Schema.Types.ObjectId,
//       ref: 'Ticket'
//     }],
//     validate: [arrayLimit, '{PATH} exceeds the limit of 10']
//   }
// });

// function arrayLimit(val) {
//   return val.length <= 10;
// }

mongoose.model('Ticket', TicketSchema);
// mongoose.model('Table', TableSchema);