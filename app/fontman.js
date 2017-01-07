/** Angular JS app
 *
 * Control main gui body.
 *
 * Created by Lahiru Pathirage @Mooniak <lpsandaruwan@gmail.com> on 11/28/16.
 */

var fontmanApp = angular.module("fontmanApp", ["ngMaterial", "ngRoute"]);

fontmanApp
    .controller("mainController", function ($http, $scope, authService) {
        authService.setStatus();

        $scope.authStatus = authService.getStatus();
        $scope.fontmanUser = "Fontman User";
        
    });

fontmanApp
    .config(function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "index.html",
            controller: fontmanApp
        })
    })

    .factory("authService", function ($http, $q) {
        var authStatus =  $q.defer();

        return {
            setStatus: function () {
                $http.get("http://127.0.0.1:5000/auth/status")
                    .then(function onSuccess(response) {
                        authStatus.resolve(response.data["status"]);
                    })
                    .catch(function onError(response)  {

                    });
            },

            getStatus: function() {
                return authStatus;
            }
        };


    });