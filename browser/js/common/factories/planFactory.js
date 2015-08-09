app.factory('planFactory', function ($http, $log) {
    var tempPlan;

    return {
        setTempPlan: function(plan){
            $log.info('hit factory', plan)
            tempPlan = plan;
            // return $http.get('/auth/twitter')
        },
        getTempPlan: function(){
            return tempPlan;
        }
    };

});
