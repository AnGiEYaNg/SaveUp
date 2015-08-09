app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        controller: 'DashboardController',
        templateUrl: 'js/dashboard/dashboard.html'
    });

});

app.controller('DashboardController', function ($scope, $interval) {

    $scope.user = {
      goals: {
        name: '',
        cost: '',
        plan: {
          withdrawalFrequency: '',
          installmentAmount: '',
          installmentsRemaining: ''
        }
      },
      financials: {        
        netIncome: '',
        fixedExpenses: '',
        disposableIncome: ''
      }
    };


    $scope.user.goals.plan.installmentsRemaining = $scope.user.goals.cost/$scope.user.goals.plan.installmentAmount

    $scope.calcTime = function(){
      if(calculator())
      $scope.time = Number($scope.user.goals.cost) / (Number($scope.user.goals.plan.installmentAmount) * Number($scope.user.goals.plan.withdrawalFrequency))
    }

    $scope.formFilled = false;
    
    var calculator = function () {
      var filled = true;
      if(!$scope.user.goals.plan.installmentAmount || !$scope.user.goals.plan.withdrawalFrequency) filled = false;
      for(var prop in $scope.user.financials){
        if(!prop) filled = false;
      }
      // $scope.time =  $scope.user.goals.cost / ($scope.user.goals.plan.installmentAmount * $scope.user.goals.plan.withdrawalFrequency)
      // $scope.formFilled = true;
      return $scope.formFilled = filled;
    }

    $interval($scope.calcTime, 30);

    $scope.submit = function () {

    }

});