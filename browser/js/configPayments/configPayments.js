app.config(function ($stateProvider) {

    $stateProvider.state('configPayments', {
        url: '/configPayments',
        templateUrl: 'js/configPayments/configPayments.html',
        controller: 'configPaymentsCtrl'
    });

});

app.controller('configPaymentsCtrl', function ($scope) {

    $scope.optSelected;

    $scope.paymentOptions = [
        { label: 'Paypal', value: 'Paypal'},
        { label: 'Credit Card', value: 'CC'}
    ];

});
