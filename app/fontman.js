/** Angular JS app
 *
 * Control main gui body.
 *
 * Created by Lahiru Pathirage @Mooniak <lpsandaruwan@gmail.com> on 11/28/16.
 */

var fontmanApp = angular.module("fontmanApp", [
    "collectionsModule",
    "fontsModule",
    "InlineTextEditor",
    "ngMaterial",
    "ngMaterialSidemenu",
    "ngMessages",
    "ngRoute",
    "ngSanitize",
    "typecasesModule",
    "ui.validate"
]);


fontmanApp
    .config(function ($httpProvider, $locationProvider, $routeProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "views/fonts.html",
                controller: "fontsController"
            })
            .when("/collections", {
                templateUrl: "views/collections.html",
                controller: "collectionsController"
            })
            .when("/comparison", {
                templateUrl: "views/compare.html",
                controller: "comparisonController"
            })
            .when("/typecases", {
                templateUrl: "views/typecase.html",
                controller: "typecasesController"
            })
            .otherwise("/");
    });


fontmanApp
    .controller("mainController", function ($http, $mdDialog, $scope) {
        $scope.authStatus = undefined;
        $scope.fontmanUser = undefined;
        $scope.fontmanUserId = undefined;
        $scope.inProgress = false;
        $scope.selectedNavIndex = 0;

        // login dialog
        $scope.loginDialog = function (ev) {
            $mdDialog.show({
                controller: loginController,
                templateUrl: "ng-modules/ng-templates/login.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen
            })
                .then(function () {
                    setAuthStatus();  // refresh auth status
                })
        };

        // logout prompt
        $scope.logout = function (ev, user_id) {
            var confirm = $mdDialog.confirm()
                .title("Logout?")
                .textContent("You won't be able to use collaboration tools and typecase features after logging out.")
                .ariaLabel('logoutPrompt')
                .targetEvent(ev)
                .ok("Logout")
                .cancel("Cancel");
            
            $mdDialog.show(confirm).then(function () {
                $http.get("http://127.0.0.1:5000/auth/" + user_id + "/logout")
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
        
        // set navigation index
        $scope.setSelectedNavIndex = function (index) {
            $scope.selectedNavIndex = index;
        };

        // login controller
        var loginController = function ($http, $mdDialog, $scope) {
            $scope.inProgress = false;
            $scope.errorResponse = undefined;
            $scope.loginData = {
                email: undefined,
                password: undefined
            };

            $scope.profileData = {
                email: undefined,
                name: undefined,
                password: undefined
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
                            $scope.inProgress = false;
                            $mdDialog.hide();
                        } else {
                            $scope.inProgress = false;
                            alert(response.data.error);
                        }
                    })
                    .catch(function onError() {
                        $scope.inProgress = false;
                        alert("FMS connection failed!")
                    });

                $scope.inProgress = false;
            };

            $scope.loginProfile = function () {
                $scope.inProgress = true;

                $http.post("http://127.0.0.1:5000/auth/login", $scope.loginData)
                    .then(function onSuccess(response) {
                        if(response.data === true) {
                            $scope.inProgress = false;
                            $mdDialog.hide();
                        } else {
                            $scope.errorResponse = response.data;
                            $scope.inProgress = false;
                        }
                    })
                    .catch(function onError() {
                        $scope.inProgress = false;
                        alert("FMS connection failed!");
                    });

                $scope.inProgress = false;
            };
        };

        // set user status
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

        // set user data
        var setUserData = function () {
            if($scope.authStatus===true) {
                $http.get("http://127.0.0.1:5000/auth/profile")
                    .then(function onSuccess(response) {
                        $scope.fontmanUser = (response.data.name);
                        $scope.fontmanUserId = response.data.user_id;
                    })
                    .catch(function onError(response) {
                        alert("FMS connection failed!");
                    })
            }  else  {
                $scope.fontmanUser = "FONTMAN USER";
            }
        };
        
        setAuthStatus();
    });

fontmanApp
    .factory("fontSelectorService", function () {
        var font  = undefined;

        return {
            getSelectedFont: function () {
                return font;
            },

            selectFont: function (_font) {
                font = _font;
            }
        }
    });
