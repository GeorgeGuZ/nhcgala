'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	},
	answer: {
		type: [{
			type: String,
			enum: ['A', 'B', 'C', 'D', ''],
			default: ['']
		}]
	},
	correctAnswer: {
		type: [{
			type: String,
			enum: ['A', 'B', 'C', 'D', '']
		}]
	},
	round: {
		type: Number,
		default: 0
	},
	score: {
		type: Number,
		default: 0
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Article', ArticleSchema);