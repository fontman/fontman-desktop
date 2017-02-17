/**
 * Created by lpsandaruwan on 1/22/17.
 */


var typecaseModule = angular.module("typecaseModule", []);


typecaseModule
    .controller("typecaseController", function ($http, $mdDialog, $scope, $timeout) {
        $scope.collections = undefined;
        $scope.errorMsg = {error: ""};
        $scope.favoriteFonts = undefined;
        $scope.systemFonts = undefined;

        // get collections list
        var getCollections = function () {
            $http.get("http://127.0.0.1:5000/collections")
                .then(function onSuccess(response) {
                    $scope.collections = response.data;
                })
                .catch(function onError() {
                    $scope.errorMsg.error = "FMS connection failed";
                })
        };

        // get favorites font list
        var getFavorites = function () {
            $http.get("http://127.0.0.1:5000/fonts/?is_chosen=True")
                .then(function onSuccess(response) {
                    $scope.favoriteFonts = response.data;
                })
                .catch(function onError() {
                    $scope.errorMsg.error = "FMS connection failed";
            })
        };

        // get system Fonts
        var getSystemFonts = function () {
            $timeout(function () {
                $http.get("http://127.0.0.1:5000/system/fonts")
                    .then(function onSuccess(response) {
                        $scope.systemFonts = response.data;
                    })
                    .catch(function onError() {
                        $scope.errorMsg.error = "FMS connection failed";
                    })
            }, 200);

        };
        
        getCollections();
        getFavorites();
        getSystemFonts();

    });
