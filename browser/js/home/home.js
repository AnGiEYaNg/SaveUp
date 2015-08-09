'use strict'
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl'
    });
});

app.controller('homeCtrl', function($scope, $state, $interval){

	// $scope.wanted;

	$scope.enterPlan = function(plan){
		// $scope.user.goals.name  = plan;
		console.log(plan)
	}


    $scope.wanted;
    $scope.categories = [
      'a vacation',
      'my education',
      'a bag',
      'a computer',
      'a concert'
    ];

    $scope.setWanted = function () {
     $scope.wanted = $scope.categories[Math.floor(Math.random()*$scope.categories.length)];
    }

    $scope.setWanted();
    $interval($scope.setWanted, 2000);

});