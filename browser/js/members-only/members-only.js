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

app.controller('ProgressDemoCtrl', function($scope, $state, $interval, planFactory, $log, $modal, AuthService){
      !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

    $scope.dynamic = 63;
    $log.info('huh?', $scope.user)

    $scope.user;

    $scope.msg = "Hey! I'm saving towards a goal! You can contribute so I can reach my goal at"

    AuthService.getLoggedInUser().then(function(user) {
        $scope.user = user;
    });
    
    $scope.contributorsData = [{name:'Dad', contributionAmount: '$1000.00'}, {name:'Mom', contributionAmount: '$600.00'}]

});
