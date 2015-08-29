'use strict';

(function() {
	// Draws Controller Spec
	describe('Draws Controller Tests', function() {
		// Initialize global variables
		var DrawsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Draws controller.
			DrawsController = $controller('DrawsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Draw object fetched from XHR', inject(function(Draws) {
			// Create sample Draw using the Draws service
			var sampleDraw = new Draws({
				name: 'New Draw'
			});

			// Create a sample Draws array that includes the new Draw
			var sampleDraws = [sampleDraw];

			// Set GET response
			$httpBackend.expectGET('draws').respond(sampleDraws);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.draws).toEqualData(sampleDraws);
		}));

		it('$scope.findOne() should create an array with one Draw object fetched from XHR using a drawId URL parameter', inject(function(Draws) {
			// Define a sample Draw object
			var sampleDraw = new Draws({
				name: 'New Draw'
			});

			// Set the URL parameter
			$stateParams.drawId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/draws\/([0-9a-fA-F]{24})$/).respond(sampleDraw);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.draw).toEqualData(sampleDraw);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Draws) {
			// Create a sample Draw object
			var sampleDrawPostData = new Draws({
				name: 'New Draw'
			});

			// Create a sample Draw response
			var sampleDrawResponse = new Draws({
				_id: '525cf20451979dea2c000001',
				name: 'New Draw'
			});

			// Fixture mock form input values
			scope.name = 'New Draw';

			// Set POST response
			$httpBackend.expectPOST('draws', sampleDrawPostData).respond(sampleDrawResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Draw was created
			expect($location.path()).toBe('/draws/' + sampleDrawResponse._id);
		}));

		it('$scope.update() should update a valid Draw', inject(function(Draws) {
			// Define a sample Draw put data
			var sampleDrawPutData = new Draws({
				_id: '525cf20451979dea2c000001',
				name: 'New Draw'
			});

			// Mock Draw in scope
			scope.draw = sampleDrawPutData;

			// Set PUT response
			$httpBackend.expectPUT(/draws\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/draws/' + sampleDrawPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid drawId and remove the Draw from the scope', inject(function(Draws) {
			// Create new Draw object
			var sampleDraw = new Draws({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Draws array and include the Draw
			scope.draws = [sampleDraw];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/draws\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDraw);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.draws.length).toBe(0);
		}));
	});
}());