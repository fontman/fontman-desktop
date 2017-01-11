/**
 * Fonts related operations.
 * 
 * Created by lpsandaruwan on 1/11/17.
 */


var fontsModule = angular.module("fontsModule", []);


fontsModule
    .controller("fontsController", function ($http, $mdDialog, $scope, $timeout, fontSelectorService) {
        $scope.editableText = "";
        $scope.fontsList = null;
        $scope.selectedFont = null;

        // set selected font data
        $scope.selectFont = function (font) {
            fontSelectorService.selectFont(font);
            $scope.selectedFont = fontSelectorService.getSelectedFont();
        };

        // get fonts list
        var getFontsList = function () {
            $http.get("http://127.0.0.1:5000/fonts")
                .then(function onSuccess(response) {
                    $scope.fontsList = response.data;
                })
                .catch(function onError(response) {
                    alert("FMS connection failed!");
                })
        };

        var getFontfacesList = function (font) {
            $http.get("http://127.0.0.1:5000/fontfaces/?font_id=" + font.font_id)
                .then(function onSuccess(response) {
                    font.fontfaces = response.data;
                })
                .catch(function onError(response) {
                    alert("FMS connection failed!");
                });
        };

        getFontsList();

        $timeout(function () {
            angular.forEach($scope.fontsList, function (font) {
                getFontfacesList(font);
            });

        }, 5);
    });


fontsModule
    .controller("fontBucketController", function ($http, $mdDialog, $scope, $timeout, fontBucketService) {

    });


fontsModule
    .controller("collectionsController", function ($http, $mdDialog, $scope, $timeout) {
        
    });