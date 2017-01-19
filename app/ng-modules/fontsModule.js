/**
 * Fonts related operations.
 * 
 * Created by lpsandaruwan on 1/11/17.
 */


var fontsModule = angular.module("fontsModule", []);


fontsModule
    .controller("fontsController", function ($http, $mdDialog, $scope, $timeout, fontSelectorService) {
        $scope.fontsList = null;
        $scope.fontBucket = null;
        $scope.selectedFont = {};
        $scope.selectedFont.defaultText = "Fontman";
        $scope.selectedFont.defaultTextSize = 40;

        // get font bucket list
        var getFontBucket = function () {
            $http.get("http://127.0.0.1:5000/fonts/?" + "is_chosen=true")
                .then(function onSuccess(response) {
                    $scope.fontBucket = response.data;
                })
                .catch(function onError(response) {
                    return {"error": "FMS connection failed"}
                });
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

        // add font to temp choices
        $scope.addToBucket = function (font) {
            $scope.json_data = {is_chosen: true};

            $http.post("http://127.0.0.1:5000/fonts/" + font.font_id + "/update", $scope.json_data)
                .then(function onSuccess(response) {
                    if (response.data) {
                        font.chosen = true;
                    }
                })
                .catch(function onError(response) {
                    alert("FMS connection failed");
                });

            $timeout(function () {
                getFontBucket();
            }, 300);


        };

        $scope.flushFontBucket = function () {
            var json_data = {is_chosen: false};
            $http.post("http://127.0.0.1:5000/fonts/update", json_data)
                .then(function onSuccess(response) {
                    if (response.data) {
                        getFontBucket();
                        getFontsList();
                    }
                })
                .catch(function onError(response) {
                    alert("FMS connection failed");
                });
        };

        /* option display on mouse hover */
        $scope.hoverIn = function () {
            this.hoverEdit = true;
        };

        $scope.hoverOut = function () {
            this.hoverEdit = false;
        };

        // remove from temp choices
        $scope.removeFromBucket = function (font) {
            $scope.json_data = {is_chosen: false};

            $http.post("http://127.0.0.1:5000/fonts/" + font.font_id + "/update", $scope.json_data)
                .then(function onSuccess(response) {
                    if (response.data) {
                        font.chosen = false;
                    }
                })
                .catch(function onError(response) {
                    alert("FMS connection failed");
                });

            $timeout(function () {
                getFontBucket();
            }, 300);
        };

        // set selected font data
        $scope.selectFont = function (font) {
            fontSelectorService.selectFont(font);
            $scope.selectedFont = fontSelectorService.getSelectedFont();
        };

        // load fonts list from FMS database
        getFontBucket();
        getFontsList();

        // set first font of the fonts list as the selected font
        $timeout(function () {
            fontSelectorService.selectFont($scope.fontsList[0]);
            $scope.selectedFont = fontSelectorService.getSelectedFont();

        }, 1000);

    });


fontsModule
    .controller("comparisonController", function ($http, $mdDialog, $scope, $timeout) {
        $scope.fontBucket = null;
        $scope.mainTitle = "maintitle";
        $scope.subTitle = "subtitle";
        $scope.textBody = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris risus ex, maximus vel dignissim et, auctor et lectus. Integer aliquet quam augue, eget venenatis ante fermentum in. Integer semper cursus nisi, non mattis ipsum pellentesque id. Donec auctor eros eu nunc vehicula posuere. Vivamus pharetra pulvinar molestie. Phasellus ullamcorper dui pretium, faucibus leo vel, hendrerit nisi. Etiam sed condimentum metus, quis vehicula nisl. Suspendisse sodales est lorem, eget luctus nisi egestas nec. Pellentesque rhoncus mi sed purus malesuada, quis laoreet lorem molestie. Sed nec purus elit. Nullam ut tortor congue, feugiat eros hendrerit, feugiat turpis.";

        // get font bucket list
        var getFontBucket = function () {
            $http.get("http://127.0.0.1:5000/fonts/?" + "is_chosen=true")
                .then(function onSuccess(response) {
                    $scope.fontBucket = response.data;
                })
                .catch(function onError(response) {
                    return {"error": "FMS connection failed"}
                });
        };


        /* option display on mouse hover */
        $scope.hoverIn = function () {
            this.hoverEdit = true;
        };

        $scope.hoverOut = function () {
            this.hoverEdit = false;
        };

        $timeout(function () {
            getFontBucket();
        }, 300);
    });
