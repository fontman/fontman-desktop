/**
 * Created by lpsandaruwan on 11/28/16.
 */

angular
    .module("channels", ['ngMaterial', 'ngMessages'])
    .controller("channels", function ($filter, $http, $location, $mdDialog, $scope, $timeout) {

        $scope.channels_list = null;

        /* update all channels list */
        var update_channel_list = function () {
            $http.get("http://0.0.0.0:5000/channels/all")
                .success(function (data, status, header, config) {
                    $scope.channels_list = data;
                })
                .error(function (data, status, header, config) {

                })
        };

        update_channel_list();
        
});