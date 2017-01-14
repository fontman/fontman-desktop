/**
 * Fonts related operations.
 * 
 * Created by lpsandaruwan on 1/11/17.
 */


var fontsModule = angular.module("fontsModule", []);


fontsModule
    .controller("fontsController", function ($http, $mdDialog, $scope, $timeout, fontSelectorService) {
        $scope.bodyText = "aBc";
        $scope.bodyTextSize = 40;
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

        // get fontfaces list and assign it to font.fontfaces
        var getFontfacesList = function (font) {
            $http.get("http://127.0.0.1:5000/fontfaces/?font_id=" + font.font_id)
                .then(function onSuccess(response) {
                    font.fontfaces = response.data;
                    setRegularFont(font);
                })
                .catch(function onError(response) {
                    alert("FMS connection failed!");
                });

        };

        // set regular font as default font
        var setRegularFont = function (font) {
            angular.forEach(font.fontfaces, function (fontface) {
                if((fontface.fontface).toLowerCase().includes('regular')) {
                    font.selectedFontface = font.name + "-" + fontface.fontface;
                }
            })
        };

        getFontsList();

        $timeout(function () {
            angular.forEach($scope.fontsList, function (font) {
                getFontfacesList(font);
            });

        });

        /* option display on mouse hover */
        $scope.hoverIn = function () {
            this.hoverEdit = true;
        };

        $scope.hoverOut = function () {
            this.hoverEdit = false;
        };
    });


fontsModule
    .controller("fontBucketController", function ($http, $mdDialog, $scope, $timeout, fontBucketService) {

    });


fontsModule
    .controller("comparisonController", function ($http, $mdDialog, $scope, $timeout) {
        
    });