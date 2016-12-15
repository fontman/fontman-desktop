/**
 * Created by lpsandaruwan on 11/28/16.
 */

angular
    .module('preferences', ['ngMaterial', 'ngMessages'])
    .controller('preferences', function ($filter, $http, $location, $mdDialog, $scope, $timeout) {
        
        $scope.pref_in_progress = false;
        $scope.languages_list = null;
        $scope.notify = "";
        $scope.refresh_rate = null;

        $scope.refresh_rates = [
            {value: "1h", text: "hour"},
            {value: "2h", text: "2 hours"},
            {value: "3h", text: "3 hours"},
            {value: "4h", text: "6 hours"},
            {value: "5h", text: "12 hours"}
        ];


        /* send languages list changes */
        var save_languages_settings = function () {
            $http.post("http://127.0.0.1:5000/preferences/languages", $scope.languages_list)
                .success(function (data, status, headers, config) {

                })
        };

        var save_refresh_rate = function () {
            $http.get("http://127.0.0.1:5000/preferences/refresh_rate/" + $scope.refresh_rate)
                .success(function (data, status, headers, config) {
                    $scope.pref_in_progress = false;
                })
        };

        /* update languages list */
        var update_languages_list = function () {
            $http.get("http://127.0.0.1:5000/preferences/languages/all")
                .success(function (data, status, headers, config) {
                    $scope.languages_list = data;
                })
                
                .error(function (data, status, headers, config) {
                    $scope.notify = "error : " + status;
                })
        };

        /* get refresh rate value */
        var update_refresh_rate = function () {
            $http.get("http://127.0.0.1:5000/preferences/refresh_rate")
                .success(function (data, status, headers, config) {
                    $scope.refresh_rate = data;
                })
        };

        /* save settings */
        $scope.save_preferences = function () {
            $scope.pref_in_progress = true;

            $timeout(function () {
                save_refresh_rate();
            }, 1000);
            save_languages_settings();
        };

        update_languages_list();
        update_refresh_rate();
});