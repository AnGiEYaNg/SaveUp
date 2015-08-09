'use strict'
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl'
    });
});

app.controller('homeCtrl', function($scope, $state, $interval, planFactory, $log, $modal){

	// $scope.wanted;
  $scope.showAlert = false;

  $scope.enterPlan = function(plan){

    if(!$scope.newPlan.name || !$scope.newPlan.cost) return $scope.showAlert = true;
    else{
      var modalInstance = $modal.open({
        templateUrl: 'js/home/homeModal.html',
        controller: 'deleteModalCtrl',
        resolve: {
          plan: function(){
            return plan;
          }
        }
      });
      
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

app.controller('deleteModalCtrl', function($scope, planFactory, $modalInstance, plan, $state, $log) {
  // console.log('hit modal controller',product)
  $log.info('hit control', JSON.stringify(plan))

  localStorage.setItem('tempPlan', JSON.stringify(plan));

  $scope.close = function () {
    $modalInstance.close();
  }

});