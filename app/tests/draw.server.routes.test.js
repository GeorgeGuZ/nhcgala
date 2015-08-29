'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Draw = mongoose.model('Draw'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, draw;

/**
 * Draw routes tests
 */
describe('Draw CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Draw
		user.save(function() {
			draw = {
				name: 'Draw Name'
			};

			done();
		});
	});

	it('should be able to save Draw instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Draw
				agent.post('/draws')
					.send(draw)
					.expect(200)
					.end(function(drawSaveErr, drawSaveRes) {
						// Handle Draw save error
						if (drawSaveErr) done(drawSaveErr);

						// Get a list of Draws
						agent.get('/draws')
							.end(function(drawsGetErr, drawsGetRes) {
								// Handle Draw save error
								if (drawsGetErr) done(drawsGetErr);

								// Get Draws list
								var draws = drawsGetRes.body;

								// Set assertions
								(draws[0].user._id).should.equal(userId);
								(draws[0].name).should.match('Draw Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Draw instance if not logged in', function(done) {
		agent.post('/draws')
			.send(draw)
			.expect(401)
			.end(function(drawSaveErr, drawSaveRes) {
				// Call the assertion callback
				done(drawSaveErr);
			});
	});

	it('should not be able to save Draw instance if no name is provided', function(done) {
		// Invalidate name field
		draw.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Draw
				agent.post('/draws')
					.send(draw)
					.expect(400)
					.end(function(drawSaveErr, drawSaveRes) {
						// Set message assertion
						(drawSaveRes.body.message).should.match('Please fill Draw name');
						
						// Handle Draw save error
						done(drawSaveErr);
					});
			});
	});

	it('should be able to update Draw instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Draw
				agent.post('/draws')
					.send(draw)
					.expect(200)
					.end(function(drawSaveErr, drawSaveRes) {
						// Handle Draw save error
						if (drawSaveErr) done(drawSaveErr);

						// Update Draw name
						draw.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Draw
						agent.put('/draws/' + drawSaveRes.body._id)
							.send(draw)
							.expect(200)
							.end(function(drawUpdateErr, drawUpdateRes) {
								// Handle Draw update error
								if (drawUpdateErr) done(drawUpdateErr);

								// Set assertions
								(drawUpdateRes.body._id).should.equal(drawSaveRes.body._id);
								(drawUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Draws if not signed in', function(done) {
		// Create new Draw model instance
		var drawObj = new Draw(draw);

		// Save the Draw
		drawObj.save(function() {
			// Request Draws
			request(app).get('/draws')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Draw if not signed in', function(done) {
		// Create new Draw model instance
		var drawObj = new Draw(draw);

		// Save the Draw
		drawObj.save(function() {
			request(app).get('/draws/' + drawObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', draw.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Draw instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Draw
				agent.post('/draws')
					.send(draw)
					.expect(200)
					.end(function(drawSaveErr, drawSaveRes) {
						// Handle Draw save error
						if (drawSaveErr) done(drawSaveErr);

						// Delete existing Draw
						agent.delete('/draws/' + drawSaveRes.body._id)
							.send(draw)
							.expect(200)
							.end(function(drawDeleteErr, drawDeleteRes) {
								// Handle Draw error error
								if (drawDeleteErr) done(drawDeleteErr);

								// Set assertions
								(drawDeleteRes.body._id).should.equal(drawSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Draw instance if not signed in', function(done) {
		// Set Draw user 
		draw.user = user;

		// Create new Draw model instance
		var drawObj = new Draw(draw);

		// Save the Draw
		drawObj.save(function() {
			// Try deleting Draw
			request(app).delete('/draws/' + drawObj._id)
			.expect(401)
			.end(function(drawDeleteErr, drawDeleteRes) {
				// Set message assertion
				(drawDeleteRes.body.message).should.match('User is not logged in');

				// Handle Draw error error
				done(drawDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Draw.remove().exec();
		done();
	});
});