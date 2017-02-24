/**
 * Fonts related operations.
 * 
 * Created by lpsandaruwan on 1/11/17.
 */

var fontsModule = angular.module("fontsModule", []);


fontsModule
    .controller("fontsController", function ($http, $mdDialog, $scope, $timeout, fontSelectorService) {
        $scope.displayTexts = [
            "Nymphs blitz quick vex dwarf jog.",
            "DJs flock by when MTV ax quiz prog.",
            "Big fjords vex quick waltz nymph.",
            "Junk MTV quiz graced by fox whelps.",
            "Vamp fox held quartz duck just by wing."
        ];
        $scope.fontBoxStyle = {"min-height": "250px", "width": "300px"};
        $scope.fontsList = null;
        $scope.selectedFont = {};

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

        // load fonts list from FMS database
        getFontsList();


        /* font view options */
        // set view options and controllers
        $scope.viewMethods = [
            {id: 1, value: "Numerals"},
            {id: 2, value: "Phrase"},
            {id: 3, value: "Paragraph"}
        ];

        $scope.changeView = function (font) {
            if (font.viewId.id === 1) {
                font.displayText = "0 1 2 3 4 5 6 7 8 9";
                $scope.fontBoxStyle = {"min-height": "250px", "width": "300px"};
                font.textSize = 25;

            } else if (font.viewId.id === 2) {
                font.displayText = $scope.displayTexts[font.fontId%5];
                $scope.fontBoxStyle = {"min-height": "300px", "width": "300px"};
                font.textSize = 25;

            } else if (font.viewId.id == 3) {
                font.displayText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris risus ex, maximus vel dignissim et, auctor et lectus. Integer aliquet quam augue, eget venenatis ante fermentum in. Integer semper cursus nisi, non mattis ipsum pellentesque id."
                $scope.fontBoxStyle = {"min-height": "350px", "width": "500px"};
                font.textSize = 18;
            }
        };

        // apply current view to all the fonts
        $scope.applyToAll = function (_font) {
            angular.forEach($scope.fontsList, function (font) {
                font.displayText = _font.displayText;
                font.textSize = _font.textSize;
            })
        };


        /* favorite collection operations */
        // add font to favorites
        $scope.addToFavorites = function (font) {
            $scope.json_data = {is_chosen: true};

            $http.post("http://127.0.0.1:5000/fonts/" + font.fontId + "/update", $scope.json_data)
                .then(function onSuccess(response) {
                    if (response.data) {
                        font.isChosen = true;
                    }
                })
                .catch(function onError(response) {
                    alert("FMS connection failed");
                });
        };

        // remove from favorites
        $scope.removeFromFavorites = function (font) {
            $scope.json_data = {is_chosen: false};

            $http.post("http://127.0.0.1:5000/fonts/" + font.fontId + "/update", $scope.json_data)
                .then(function onSuccess(response) {
                    if (response.data) {
                        font.isChosen = false;
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

        // set selected font data
        $scope.selectFont = function (font) {
            fontSelectorService.selectFont(font);
            $scope.selectedFont = fontSelectorService.getSelectedFont();
        };

        // set first font of the fonts list as the selected font
        $timeout(function () {
            fontSelectorService.selectFont($scope.fontsList[0]);
            $scope.selectedFont = fontSelectorService.getSelectedFont();
        }, 500);


        /*** specimen view controllers ***/
        // show font specimen view
        $scope.showSpecimenView = function (ev, font) {
            $mdDialog.show({
                controller: specimenController,
                templateUrl: "ng-modules/ng-templates/specimen_view.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen,
                locals: {
                    "font": font
                }
            })

                .then(function () {
                    getFontsList();  // refresh fonts list
                })
        };
        
        
        var specimenController = function ($http, $mdDialog, $scope, font) {
            $scope.font = font;

            $scope.cancel = function() {
                $mdDialog.cancel();
            };
        };


        /*** Font installation controllers ***/
        // show installation window
        $scope.openFontInstaller = function (ev, font) {
            $mdDialog.show({
                controller: installerController,
                templateUrl: "ng-modules/ng-templates/font_installer_dialog.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false,
                fullscreen: $scope.customFullscreen,
                locals: {
                    "font": font
                }
            })
                .then(function () {
                    getFontsList();  // refresh fonts list
                })
        };

        var installerController = function ($http, $mdDialog, $scope, font) {
            $scope.font = font;

            $http.get("http://127.0.0.1:5000/fonts/" + font.fontId + "/install")
                .then(function onSuccess(response) {
                    if (response.data) {
                        $mdDialog.hide();
                    }
                })
                .catch(function onError() {
                })
        };


        /*** Remove Font ***/
        // uninstall a font
        $scope.removeFont = function (font) {
            $http.get("http://127.0.0.1:5000/fonts/" + font.fontId + "/remove")
                .then(function onSuccess(response) {
                    if (response.data) {
                        getFontsList();
                    }
                })
                .catch(function onError() {
                })
        };
    });
