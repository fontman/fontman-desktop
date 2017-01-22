/**
 * Created by lpsandaruwan on 1/22/17.
 */


var typecasesModule = angular.module("typecasesModule", []);


typecasesModule
    .controller("typecasesController", function ($http, $mdDialog, $scope) {
        $scope.myFonts = undefined;
        
        $scope.addNewFontDialog = function (ev) {
            $mdDialog.show({
                controller: addNewFontController,
                templateUrl: "ng-modules/ng-templates/add_font.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen
            })
                .then(function () {
                    refreshMyFontsList();
                })
        };

        var addNewFontController = function ($http, $mdDialog, $scope) {
            $scope.channelsList = undefined;
            $scope.inProgress = false;
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
                $mdDialog.hide();
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
                            $scope.inProgress = false;
                            $scope.cancel();
                        } else {
                            $scope.inProgress = false;
                            alert(response.data.error);
                        }
                    })
                    .catch(function onError() {
                        $scope.inProgress = false;
                        alert("FMS connection failed!")
                    });
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

            setChannelsList();
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

        refreshMyFontsList();
    });