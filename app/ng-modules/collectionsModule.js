/**
 * Created by lpsandaruwan on 1/18/17.
 */

var collectionsModule = angular.module("collectionsModule", []);


collectionsModule
    .controller("collectionsController", function ($http, $mdDialog, $scope) {
        $scope.collectionsList = undefined;

        // display add collection dialog
        $scope.addCollectionDialog = function (ev) {
            $mdDialog.show({
                controller: addCollectionController,
                templateUrl: "ng-modules/ng-templates/add_collection.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen
            })
                .then(function () {
                    getCollectionsList();
                })
        };

        var getCollectionsList = function () {
            $http.get("http://127.0.0.1:5000/collections")
                .then(function onSuccess(response) {
                    $scope.collectionsList = response.data;
                })
                .catch(function onError(response) {
                    alert("FMS connection failed");
                });
        };

        var addCollectionController = function ($http, $mdDialog, $scope) {
            $scope.inProgress = false;
            $scope.types = ["Private"];
            
            $scope.newCollection = {
                name: undefined,
                type: "Private"
            };

            $scope.cancel = function() {
                $mdDialog.hide();
            };

            $scope.createCollection = function () {
                $scope.inProgress = true;

                $http.post("http://127.0.0.1:5000/collections/new", $scope.newCollection)
                    .then(function onSuccess(response) {
                        $scope.inProgress = false;
                        $scope.cancel();
                    })
                    .catch(function onError(response) {
                        $scope.inProgress = false;
                        alert("FMS connnection error");
                    });
            };

        };
        
        getCollectionsList();
    });