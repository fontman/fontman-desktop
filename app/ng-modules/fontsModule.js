/**
 * Fonts related operations.
 * 
 * Created by lpsandaruwan on 1/11/17.
 */

var fontsModule = angular.module("fontsModule", []);


fontsModule
    .controller("fontsController", function ($http, $mdDialog, $scope, $timeout, fontSelectorService) {
        $scope.fontsList = null;
        $scope.selectedFont = {};
        $scope.textSize = 50;
        $scope.viewId = {id: 2};
        $scope.viewMethods = [
            {id: 1, value: "Numerals"},
            {id: 2, value: "Font name"},
            {id: 3, value: "Phrase"},
            {id: 4, value: "Paragraph"}
        ];

        // change font view
        $scope.$watch('viewId.id', function () {
            if ($scope.viewId.id === 1) {
                angular.forEach($scope.fontsList, function (font) {
                    font.displayText = "1 2 3 4 5 6 7 8 9 0";
                });

                $scope.textSize = 60;

            } else if ($scope.viewId.id === 2) {
                angular.forEach($scope.fontsList, function (font) {
                    font.displayText = font.name;
                });

                $scope.textSize = 60;

            } else if ($scope.viewId.id === 3) {
                $scope.displayTexts = [
                    "Nymphs blitz quick vex dwarf jog.",
                    "DJs flock by when MTV ax quiz prog.",
                    "Big fjords vex quick waltz nymph.",
                    "Junk MTV quiz graced by fox whelps.",
                    "Vamp fox held quartz duck just by wing."
                ];
                $scope.phraseIndex = 0;

                angular.forEach($scope.fontsList, function (font) {
                    font.displayText = $scope.displayTexts[$scope.phraseIndex%5];
                    $scope.phraseIndex++;
                });

                $scope.textSize = 30;

            } else if($scope.viewId.id === 4) {
                angular.forEach($scope.fontsList, function (font) {
                    font.displayText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris risus ex, maximus vel dignissim et, auctor et lectus. Integer aliquet quam augue, eget venenatis ante fermentum in. Integer semper cursus nisi, non mattis ipsum pellentesque id. Donec auctor eros eu nunc vehicula posuere.";
                });

                $scope.textSize = 16;
            }
        });

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

        // load fonts list from FMS database
        getFontsList();

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
            
            
        }

    });
