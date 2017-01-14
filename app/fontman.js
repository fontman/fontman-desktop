/** Angular JS app
 *
 * Control main gui body.
 *
 * Created by Lahiru Pathirage @Mooniak <lpsandaruwan@gmail.com> on 11/28/16.
 */

var fontmanApp = angular.module("fontmanApp", [
    "fontsModule",
    "ngMaterial",
    "ngMaterialSidemenu",
    "ngMessages",
    "ngRoute",
    "ui.validate"
]);


fontmanApp
    .config(function ($httpProvider, $locationProvider, $routeProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "views/fonts.html",
                controller: "fontsController"
            })
            .when("/bucket", {
                templateUrl: "views/font-bucket.html",
                controller: "fontBucketController"
            })
            .when("/comparison", {
                templateUrl: "views/compare.html",
                controller: "comparisonController"
            }).otherwise("/");
    });


fontmanApp
    .controller("mainController", function ($http, $mdDialog, $scope) {
        $scope.authStatus = undefined;
        $scope.fontmanUser = undefined;
        $scope.inProgress = false;
        $scope.selectedNavIndex = 0;

        // profile creation dialog
        $scope.createProfileDialog = function (ev) {
            $mdDialog.show({
                controller: profileCreationController,
                templateUrl: "ng-modules/ng-templates/create_profile.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
                .then(function () {
                    setAuthStatus();  // refresh auth status
                })
        };

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
        $scope.logout = function (ev) {
            var confirm = $mdDialog.confirm()
                .title("Logout?")
                .textContent("You won't be able to use collaboration tools and my fonts service after logging out.")
                .ariaLabel('logoutPrompt')
                .targetEvent(ev)
                .ok("Logout")
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
        
        // display my fonts dialog box
        $scope.myFontsDialog = function (ev) {
            $mdDialog.show({
                controller: myFontsController,
                templateUrl: "ng-modules/ng-templates/my_fonts.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen
            })
                .then(function () {
                    getFontsList();
                })
        };
        
        // set navigation index
        $scope.setSelectedNavIndex = function (index) {
            $scope.selectedNavIndex = index;
        };

        // login controller
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

        // user fonts controller
        var myFontsController = function ($http, $mdDialog, $scope) {
            $scope.channelsList = undefined;
            $scope.formButtons = false;
            $scope.inProgress = false;
            $scope.myFonts = undefined;
            $scope.newFont = {
                channel_id: undefined,
                ghPagesBranch: undefined,
                gitRepository: undefined,
                ghPagesFontDir: undefined,
                gitUser: undefined,
                name: undefined,
                type: "Public"
            };
            $scope.selectedIndex = 0;
            $scope.types = [{"id": 1, "type": "Public"}];

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.clearFields = function () {
                $scope.newFont.ghPagesBranch = undefined;
                $scope.newFont.ghPagesFontDir = undefined;
                $scope.newFont.gitRepository = undefined;
                $scope.newFont.gitUser = undefined;
                $scope.newFont.name = undefined;
            };

            $scope.addNewFont = function () {
                $scope.inProgress = true;

                $http.post("http://127.0.0.1:5000/fonts/new", $scope.newFont)
                    .then(function onSuccess(response) {
                        if (response.data === true) {
                            refreshMyFontsList();
                            $scope.inProgress = false;
                            setSelectedIndexToZero();
                        } else {
                            alert(response.data.error);
                        }
                    })
                    .catch(function onError() {
                        alert("FMS connection failed!")
                    });
            };
            
            // set form button display boolean factor
            $scope.onTabChange = function (value) {
                $scope.formButtons = value;
            };

            // get my fonts list
            var refreshMyFontsList = function () {
                $http.get("http://127.0.0.1:5000/fonts/admin")
                    .then(function onSuccess(response) {
                        $scope.myFonts = response.data;
                    })
                    .catch(function onError() {
                        alert("FMS connection failed!");
                    })
            };

            // set channels list
            var setChannelsList = function () {
                $http.get("http://127.0.0.1:5000/channels")
                    .then(function onSuccess(response) {
                        $scope.channelsList = response.data;
                        $scope.newFont.channel_id = $scope.channelsList[0].channel_id;
                    })
                    .catch(function () {
                        alert("FMS connection failed!");
                    })
            };

            var setSelectedIndexToZero = function () {
                $scope.selectedIndex = 0;
            };

            refreshMyFontsList();
            setChannelsList();
        };

        // profile creation dialog controller
        var profileCreationController = function ($http, $mdDialog, $mdToast, $scope) {
            $scope.inProgress = false;
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
                $http.get("http://127.0.0.1:5000/auth/profile/name")
                    .then(function onSuccess(response) {
                        $scope.fontmanUser = (response.data.name).toUpperCase();
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


fontmanApp
    .service("fontBucketService", function () {
        var fontBucket = [];

        return {
            addToBucket: function (font) {
                fontBucket = fontBucket.concat(font);
            },

            flushBucket: function () {
                fontBucket = [];
            },

            getBucket: function () {
                return fontBucket;
            },

            removeFromBucket: function (font) {
                fontBucket.splice(fontBucket.indexOf(font), 1);
            }
        }
    });
