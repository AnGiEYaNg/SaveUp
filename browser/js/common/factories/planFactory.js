app.factory('planFactory', function ($http, $log) {
    var tempPlan;

    return {
        setTempPlan: function(plan){
            $log.info('hit factory', plan)
            tempPlan = plan;
            console.log(tempPlan)
            return plan
        },
        getTempPlan: function(){
            $log.info('hit get', tempPlan)
            return tempPlan;
        }
    };

});
