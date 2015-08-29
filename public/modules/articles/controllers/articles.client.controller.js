'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;
		$scope.questions = [
		{
				id: 0,
				content: "What's the best programming language in your opinion?",
				option: ["Java","c++","Python","Ruby"]
		},
		{
				id: 1,
				content: "What's your fav color?",
				option: ["green","yellow","blue","black"]
		},
		{
				id: 2,
				content: "What's best of this event?",
				option: ["part1","part2","part3","part4"]
		},
		{
				id: 3,
				content: "Which contry are you from?",
				option: ["Italy","China","Canada","England"]
		}

		];
		$scope.create = function() {
			var article = new Articles({
				answer: this.answer

			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.answer = [''];

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);