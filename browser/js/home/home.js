'use strict'
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl'
    });
});

app.controller('homeCtrl', function($scope, $state, $interval, planFactory, $log){

	// $scope.wanted;
  $scope.showAlert = false;

	$scope.enterPlan = function(plan){
    $log.info('hit plan', plan)
    if(!$scope.newPlan) return $scope.showAlert = true;
    else{
  		return planFactory.setTempPlan(plan);
      // console.log('hi', window.location)
      // $state.go("window.location='/auth/twitter';")
      
    }
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