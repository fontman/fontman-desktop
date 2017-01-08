/** Angular JS app
 *
 * Control main gui body.
 *
 * Created by Lahiru Pathirage @Mooniak <lpsandaruwan@gmail.com> on 11/28/16.
 */

var fontmanApp = angular.module("fontmanApp", [
    "ngMaterial",
    "ngMessages",
    "ngRoute",
    "ui.validate"
]);

fontmanApp
    .controller("mainController", function ($http, $mdDialog, $scope) {
        $scope.authStatus = null;
        $scope.fontmanUser = null;
        $scope.inProgress = false;

        /* profile creation dialog */
        $scope.createProfileDialog = function (ev) {
            $mdDialog.show({
                controller: profileCreationController,
                templateUrl: "ng-templates/create_profile.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
                .then(function () {
                    setAuthStatus();  // refresh auth status
                })
        };

        /* login dialog */
        $scope.loginDialog = function (ev) {
            $mdDialog.show({
                controller: loginController,
                templateUrl: "ng-templates/login.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
                .then(function () {
                    setAuthStatus();  // refresh auth status
                })
        };

        /* logout prompt */
        $scope.logout = function (ev) {
            var confirm = $mdDialog.confirm()
                .title("Logout?")
                .textContent("You won't be able to use colloboration tools and my fonts service after logging out.")
                .ariaLabel('logoutPrompt')
                .targetEvent(ev)
                .ok("Proceed")
                .cancel("Cancel");
            
            $mdDialog.show(confirm).then(function () {
                $http.get("http://127.0.0.1:5000/auth/logout")
                    .then(function onSuccess(response) {
                        if(response.data === true) {
                            setAuthStatus();
                            $mdDialog.hide();
                        }
                    })
                    .catch(function onError(response) {
                        alert("FMS connection failed!");
                    });
            })
        };

        /* login controller */
        var loginController = function ($http, $mdDialog, $scope) {
            $scope.inProgress = false;
            $scope.loginData = {
                email: "example@mail.com",
                password: "Secret@123"
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.clearFields = function () {
                $scope.loginData.email = undefined;
                $scope.loginData.password = undefined;
            };

            $scope.loginProfile = function () {
                $scope.inProgress = true;

                $http.post("http://127.0.0.1:5000/auth/login", $scope.loginData)
                    .then(function onSuccess(response) {
                        if(response.data === true) {
                            $mdDialog.hide();
                        } else {
                            alert(response.data.error);
                        }
                    })
                    .catch(function onError() {
                        alert("FMS connection failed!")
                    });

                $scope.inProgress = false;
            };
        };
        
        /* profile creation dialog controller */
        var profileCreationController = function ($http, $mdDialog, $scope) {
            $scope.inProgress = false;
            $scope.profileData = {
                email: "example@mail.com",
                name: "Fontman User",
                password: "Secret@123"
            };
            $scope.confirmPassword = undefined;

            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            
            $scope.clearFields = function () {
                $scope.profileData.email = undefined;
                $scope.profileData.name = undefined;
                $scope.profileData.password = undefined;
                $scope.confirmPassword = undefined;
            };

            $scope.createProfile = function () {
                $scope.inProgress = true;

                $http.post("http://127.0.0.1:5000/auth/new/profile", $scope.profileData)
                    .then(function onSuccess(response) {
                        if(response.data === true) {
                            $mdDialog.hide();
                        } else {
                            alert(response.data.error);
                        }
                    })
                    .catch(function onError() {
                        alert("FMS connection failed!")
                    });

                $scope.inProgress = false;
            };
        };

        /* set user status */
        var setAuthStatus = function () {
            $http.get("http://127.0.0.1:5000/auth/status")
                .then(function onSuccess(response) {
                    $scope.authStatus = response.data.status;
                    setUserData();
                })
                .catch(function onError(response) {
                    alert("FMS connection failed!");
                });

        };

        /* set user data */
        var setUserData = function () {
            if($scope.authStatus) {
                $http.get("http://127.0.0.1:5000/auth/profile/name")
                    .then(function onSuccess(response) {
                        $scope.fontmanUser = response.data.name;
                        console.log($scope.fontmanUser);
                    })
                    .catch(function onError(response) {
                        alert("FMS connection failed!");
                    })
            }  else  {
                $scope.fontmanUser = "Fontman User";
            }
        };

        setAuthStatus();

    });

fontmanApp
    .config(function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "index.html",
            controller: fontmanApp
        })
    });