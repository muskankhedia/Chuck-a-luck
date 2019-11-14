/* eslint-disable no-undef */
var app = angular.module('chuck-a-luck', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/',{
			templateUrl:'./html_components/checkLuck.html',
			controller:'checkLuck',
			title:'Chuck-a-Luck',
		})
		.when('/help',{
			templateUrl:'./html_components/instructions.html',
			controller:'help',
			title:'Chuck-a-Luck',
		});
});

app.controller('checkLuck', function($scope) {

	console.log('I am here');
	$scope.luckyAttempt = 0;
	$scope.wrongAttempt = 0;
	$scope.playing = false;
	$scope.correctNumber = '';
	$scope.correctPosition = 0;
	$scope.recentClickId = 0;
	$scope.attempts = 0;
	$scope.performance = '';
	$scope.showResult = false;
	$scope.disable = true;

	$scope.startGame = function() {
		console.log('start game');
		$scope.score = 0;
		$scope.correctAnswer = ''; 
		$scope.luckyAttempt = 0;
		$scope.wrongAttempt = 0;
		$scope.attempts = 0; 
		$scope.showResult = false;
		$scope.disable = true;
		document.getElementById('startreset').innerHTML = 'Reset';
		document.getElementById('value'+1).style.display = 'none';
		document.getElementById('value'+2).style.display = 'none';
		document.getElementById('value'+3).style.display = 'none';
        
		if ($scope.playing) {
			document.getElementById('startreset').innerHTML = 'Take Test';
			if($scope.recentClickId !== 0) {
				document.getElementById('box'+$scope.recentClickId).style.background = 'white';
			}
			document.getElementById('nextButton').style.display = 'none';
			$scope.playing = false;
		} else {
			$scope.generateNumbers();
			document.getElementById('nextButton').innerHTML = 'Next';
			$scope.playing = true;
		}

	};

	$scope.generateNumbers = function () {
		$scope.correctAnswer = Math.round(99*Math.random()); //to generate a random number between 0-99
		console.log('correctNumber::', $scope.correctAnswer);
		$scope.correctPosition = 1 + Math.round(2*Math.random()); // to choose a random position 
		console.log('correct position::', $scope.correctPosition);
		document.getElementById('value' + $scope.correctPosition).innerHTML = $scope.correctAnswer ; //fill one box with the correct answers
    
		//fill other boxes with wrong answers
		var answers= [$scope.correctAnswer];
		var i;
		for(i=1 ; i< 4 ;i++){
			if(i != $scope.correctPosition){
				$scope.wrongAnswer = 0;
            
				do
				{
					$scope.wrongAnswer = Math.round(99*Math.random()); //a wrong answer
				}while(answers.indexOf($scope.wrongAnswer) > -1);
                    
				// console.log("i::", i)
				document.getElementById('value'+i).innerHTML = $scope.wrongAnswer;
				answers.push($scope.wrongAnswer);
			}
		}
		$scope.disable = false;

	};
    
	$scope.boxClicked = function (id) {
		$scope.recentClickId = id;
		$scope.disable = true;
		if ($scope.playing == true) {
			let value = document.getElementById('value' + id).innerHTML;
			document.getElementById('value1').style.display = 'block';
			document.getElementById('value2').style.display = 'block';
			document.getElementById('value3').style.display = 'block';
			document.getElementById('box'+id).style.background = '#03A9F4';
			document.getElementById('nextButton').style.display = 'block';
			$scope.attempts++;
			console.log('attempts::', $scope.attempts);
			if(value == $scope.correctAnswer) {
				$scope.luckyAttempt++;
			} else {
				$scope.wrongAttempt++;
			}
			if ($scope.attempts == 10) {
				document.getElementById('nextButton').innerHTML = 'Finish';
			}
		}
	};

	$scope.Next = function () {

		if ($scope.attempts < 10 ) {
            
			document.getElementById('value1').style.display = 'none';
			document.getElementById('value2').style.display = 'none';
			document.getElementById('value3').style.display = 'none';

			document.getElementById('nextButton').style.display = 'none';
			document.getElementById('box'+$scope.recentClickId).style.background = 'white';
			$scope.generateNumbers();
		} else {
			if ($scope.luckyAttempt >= 0 && $scope.luckyAttempt < 4) {
				$scope.performance = 'Bad Luck';
			} else if ($scope.luckyAttempt > 3 && $scope.luckyAttempt < 7){
				$scope.performance = 'Good Luck';
			} else {
				$scope.performance = 'Excellent Luck';
			}
			$scope.showResult = true;
			document.getElementById('nextButton').style.display = 'none';
			document.getElementById('startreset').innerHTML = 'Test Luck';
			document.getElementById('box'+$scope.recentClickId).style.background = 'white';
			$scope.playing = false;

		}
	};
});