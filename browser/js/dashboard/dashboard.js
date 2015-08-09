app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        controller: 'DashboardController',
        templateUrl: 'js/dashboard/dashboard.html'
    });

});

app.controller('DashboardController', function ($scope) {

  $scope.user = {
    netIncome: '',
    costOfLiving: '',
    disposableIncome: '',
    installment: ''
  };

  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

});