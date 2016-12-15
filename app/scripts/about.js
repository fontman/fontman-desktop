/**
 * Created by lpsandaruwan on 12/7/16.
 */

angular
    .module("about", [])
    .controller("about", function ($http, $scope) {
        
        $scope.about = null;
        
        /* get system information */
        var get_system_infromation = function () {
            $http.get("http://127.0.0.1:5000/about")
                .then(function onSuccess(response) {
                    $scope.about = response.data;
                })
        };

        get_system_infromation();
    });