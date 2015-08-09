app.config(function ($stateProvider) {

    $stateProvider.state('configPayments', {
        url: '/configPayments',
        templateUrl: 'js/configPayments/configPayments.html',
        controller: 'configPaymentsCtrl'
    });

});

app.controller('configPaymentsCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});
