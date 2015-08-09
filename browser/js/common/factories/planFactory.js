app.factory('planFactory', function ($http, $log) {
    var tempPlan;

    return {
        // setTempPlan: function(plan){
        //     $log.info('hit factory', plan)
        //     tempPlan = plan;
        //     console.log(tempPlan)
        //     return plan
        //     // return $http.get('/auth/twitter')
        // },
        // getTempPlan: function(){
        //     $log.info('hit get', tempPlan)
        //     return tempPlan;
        // },
        savePlan: function(plan) {
            console.log('in the factory')
            return $http.put("/api/dashboard", plan)
            .then(function (response) {
                return response.data;
            });
        }
    };

});
