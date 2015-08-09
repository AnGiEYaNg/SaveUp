app.config(function ($stateProvider) {

    $stateProvider.state('membersOnly', {
        url: '/members-area',
        templateUrl: 'js/members-only/members-only.html',
        controller: 'ProgressDemoCtrl',
        data: {
            authenticate: true
        }
    });
});

app.controller('ProgressDemoCtrl', function($scope, $state, $interval, planFactory, $log, $modal){
    $scope.dynamic = 63;
    $log.info('huh?', $scope.user)

    $scope.contributorsData = [{name:'Dad', contributionAmount: 5}, {name:'Mom', contributionAmount: 20}]
});
