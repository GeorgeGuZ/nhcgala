'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;
		$scope.round = 1;
		$scope.questions = [
		{
				id: 0,
				content: 'this is question 1',
				option: ['part1','part2','part3','part4']
		},
		{
				id: 1,
				content: 'this is question 2',
				option: ['part1','part2','part3','part4']
		},
		{
				id: 2,
				content: 'this is question 3',
				option: ['part1','part2','part3','part4']
		},
		{
				id: 3,
				content: 'this is question 4',
				option: ['part1','part2','part3','part4']
		},
		{
				id: 4,
				content: 'this is question 5',
				option: ['part1','part2','part3','part4']
		},
		{
				id: 5,
				content: 'this is question 6',
				option: ['part1','part2','part3','part4']
		},
		{
				id: 6,
				content: 'this is question 7',
				option: ['part1','part2','part3','part4']
		},
		{
				id: 7,
				content: 'this is question 8',
				option: ['part1','part2','part3','part4']
		},
		{
				id: 8,
				content: 'this is question 9',
				option: ['part1','part2','part3','part4']
		},
		{
				id: 9,
				content: 'this is question 10',
				option: ['part1','part2','part3','part4']
		},
		{
				id: 10,
				content: 'this is question 11',
				option: ['part1','part2','part3','part4']
		},
		{
				id: 11,
				content: 'this is question 12',
				option: ['part1','part2','part3','part4']
		}

		];
		$scope.create = function() {
			var article = new Articles({
				answer: this.answer,
				correctAnswer: ['A','A','A','A','A','A',
								'B','B','B','B','B','B'
								],
				round: this.round
			});
		
			var score = 0;			
			for (var i in article.correctAnswer) {
				if ( article.answer[i]===article.correctAnswer[i]) {
					score++;
				}
			}
			article.score = score;

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
			article.updated = new Date(Date.now());
			var score = 0;			
			for (var i in article.correctAnswer) {
				if ( article.answer[i]===article.correctAnswer[i]) {
					score++;
				}
			}
			article.score = score;
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
			$scope.ids = [[0,1,2,3,4,5],[6,7,8,9,10,11]];

		};
	}
]);