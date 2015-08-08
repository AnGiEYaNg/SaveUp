app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        controller: 'DashboardController',
        templateUrl: 'js/dashboard/dashboard.html'
    });

});

app.controller('DashboardController', function ($scope) {


});