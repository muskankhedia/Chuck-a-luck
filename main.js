/* eslint-disable no-undef */
var app = angular.module('chuck-a-luck', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/',{
			templateUrl:'./html_components/checkLuck.html',
			controller:'checkLuck',
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

	$scope.startGame = function() {
		console.log('start game');
		if($scope.playing) {

            $scope.score = 0;
            $scope.attemps = 0;
			$scope.correctNumber = '';    

		} else {

			$scope.playing = true;
			$scope.correctNumber = '';
			$scope.score = 0;
            document.getElementById('startreset').innerHTML = 'Reset';
			$scope.generateNumbers();
		}

	};

	$scope.generateNumbers = function () {
		$scope.correctAnswer = Math.round(99*Math.random()); //to generate a random number between 0-99
        console.log("correctNumber::", $scope.correctAnswer)
        $scope.correctPosition = 1 + Math.round(3*Math.random()); // to choose a random position 
        console.log("correct position::", $scope.correctPosition)
		document.getElementById('value' + $scope.correctPosition).innerHTML = $scope.correctAnswer ; //fill one box with the correct answers
    
		//fill other boxes with wrong answers
        var answers= [$scope.correctAnswer];
        var i;
		for(i=1 ; i< 5 ;i++){
			if(i != $scope.correctPosition){
				$scope.wrongAnswer = 0;
            
				do
				{
					$scope.wrongAnswer = Math.round(99*Math.random()) //a wrong answer
				}while(answers.indexOf($scope.wrongAnswer) > -1);
                    
                // console.log("i::", i)
                document.getElementById('value'+i).innerHTML = $scope.wrongAnswer;
                answers.push($scope.wrongAnswer);
			}
		}

    };
    
    $scope.boxClicked = function (id) {
        $scope.recentClickId = id;
        if ($scope.playing == true) {
            let value = document.getElementById('value' + id).innerHTML;
            document.getElementById('value1').style.display = 'block';
            document.getElementById('value2').style.display = 'block';
            document.getElementById('value3').style.display = 'block';
            document.getElementById('value4').style.display = 'block';
            document.getElementById('box'+id).style.background = 'blue';
            document.getElementById('nextButton').style.display = 'block';
            $scope.attempts++;
            console.log("attempts::", $scope.attempts)
            if(value == $scope.correctAnswer) {
                $scope.luckyAttempt++;
            } else {
                $scope.wrongAttempt++;
            }
            if ($scope.attempts == 10) {
                document.getElementById('nextButton').innerHTML = 'Finish';
                document.getElementById('startreset').innerHTML = 'Test Luck';
            }
        }
    }

    $scope.Next = function () {

        if ($scope.attempts < 10 ) {
            document.getElementById('value1').style.display = 'none';
            document.getElementById('value2').style.display = 'none';
            document.getElementById('value3').style.display = 'none';
            document.getElementById('value4').style.display = 'none';

            document.getElementById('nextButton').style.display = 'none';
            document.getElementById('box'+$scope.recentClickId).style.background = 'white';
            $scope.generateNumbers();
        } else {
            document.getElementById('result').innerHTML = $scope.luckyAttempt;
        }
    }
});