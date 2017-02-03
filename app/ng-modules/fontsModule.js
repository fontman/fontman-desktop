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

                $scope.textSize = 40;

            } else if ($scope.viewId.id === 2) {
                angular.forEach($scope.fontsList, function (font) {
                    font.displayText = font.name;
                });

                $scope.textSize = 30;

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
                    font.displayText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris risus ex, maximus vel dignissim et, auctor et lectus. Integer aliquet quam augue, eget venenatis ante fermentum in. Integer semper cursus nisi, non mattis ipsum pellentesque id. Donec auctor eros eu nunc vehicula posuere. Vivamus pharetra pulvinar molestie. Phasellus ullamcorper dui pretium, faucibus leo vel, hendrerit nisi. Etiam sed condimentum metus, quis vehicula nisl. Suspendisse sodales est lorem, eget luctus nisi egestas nec. Pellentesque rhoncus mi sed purus malesuada, quis laoreet lorem molestie. Sed nec purus elit. Nullam ut tortor congue, feugiat eros hendrerit, feugiat turpis.";
                });

                $scope.textSize = 16;
            }
        });

        // font installation
        var fontInstallerController = function ($http, $mdDialog, $scope, font_id) {
            $scope.font_id = font_id;
            $scope.fontInfo = undefined;
            $scope.error = false;
            $scope.errorMsg = "";
            $scope.inProgress = false;
            $scope.relInfo = undefined;
            $scope.selectedReleaseId = undefined;
            
            $scope.cancel = function() {
                $mdDialog.hide();
            };

            $scope.installFont = function () {
                $scope.inProgress = true;

                $http.get("http://127.0.0.1:5000/fonts/" + $scope.font_id + "/install/" + $scope.selectedReleaseId)
                    .then(function onSucess(response) {
                        if (response.data) {
                            $scope.inProgress = false;
                        } else {
                            $scope.inProgress = false;
                            $scope.error = true;
                            $scope.errorMsg = response.data.error;
                        }
                    })
                    .catch(function onError() {
                        $scope.inProgress = false;
                    });
            };
            
            $scope.test = function () {
                alert("sfdfs");
            };

            $scope.reinstallFont = function () {
                $scope.inProgress = true;

                $http.get("http://127.0.0.1:5000/fonts/" + $scope.font_id + "/reinstall/" + $scope.selectedReleaseId)
                    .then(function onSucess(response) {
                        if (response.data) {
                            $scope.inProgress = false;
                            $scope.cancel();
                        } else {
                            $scope.inProgress = false;
                            alert(response.data.error);
                        }
                    })
                    .catch(function onError() {
                        $scope.inProgress = false;
                    });
            };

            $http.get("http://127.0.0.1:5000/fonts/" + $scope.font_id)
                .then(function onSuccess(response) {
                    $scope.fontInfo = response.data;
                });

            $http.get("http://127.0.0.1:5000/fonts/" + $scope.font_id + "/releases")
                .then(function onSuccess(response) {
                    $scope.relInfo = response.data;
                });

        };
        
        // font specimen view controller
        var fontSpecimenController = function ($http, $mdDialog, $scope, font) {
            $scope.font = font;
            
            $scope.cancel = function() {
                $mdDialog.hide();
            };
        };
        
        // font test controller
        var fontTestController = function ($http, $mdDialog, $scope, font) {
            $scope.font = angular.copy(font);

            $scope.mainTitle = "maintitle";
            $scope.mainTitleControllers = true;
            $scope.mainTitleFont = angular.copy($scope.font);
            $scope.mainTitleFontSize = 70;

            $scope.subTitle = "subtitle";
            $scope.subTitleControllers = false;
            $scope.subTitleFont = angular.copy($scope.font);
            $scope.subTitleFontSize = 40;

            $scope.textBody = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris risus ex, maximus vel dignissim et, auctor et lectus. Integer aliquet quam augue, eget venenatis ante fermentum in. Integer semper cursus nisi, non mattis ipsum pellentesque id. Donec auctor eros eu nunc vehicula posuere. Vivamus pharetra pulvinar molestie. Phasellus ullamcorper dui pretium, faucibus leo vel, hendrerit nisi. Etiam sed condimentum metus, quis vehicula nisl. Suspendisse sodales est lorem, eget luctus nisi egestas nec. Pellentesque rhoncus mi sed purus malesuada, quis laoreet lorem molestie. Sed nec purus elit. Nullam ut tortor congue, feugiat eros hendrerit, feugiat turpis.";
            $scope.textBodyControllers = false;
            $scope.textBodyFont = angular.copy($scope.font);
            $scope.textBodyFontSize = 16;

            $scope.cancel = function() {
                $mdDialog.hide();
            };
            
            $scope.mainTitleClick = function () {
                $scope.mainTitleControllers = true;
                $scope.subTitleControllers = false;
                $scope.textBodyControllers = false
            };

            $scope.subTitleClick = function () {
                $scope.mainTitleControllers = false;
                $scope.subTitleControllers = true;
                $scope.textBodyControllers = false
            };

            $scope.textBodyClick = function () {
                $scope.mainTitleControllers = false;
                $scope.subTitleControllers = false;
                $scope.textBodyControllers = true
            };
            
        };

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
                getFontsList();
            }, 300);


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
                getFontsList();
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

        // font installer dialog
        $scope.showFontInstaller = function (ev, font_id) {
            $mdDialog.show({
                controller: fontInstallerController,
                templateUrl: "ng-modules/ng-templates/install_font.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen,
                locals : {
                    font_id: font_id
                }
            })
                .then(function () {
                    getFontBucket();
                    getFontsList();
                })
        };
        
        $scope.showFontSpecimen = function (ev, font) {
            json_data = {"selectedFontface": font.selectedFontface};
            $http.post("http://127.0.0.1:5000/fontfaces/" + font.font_id + "/specimen/set", json_data)
                .then(function onSuccess(response) {
                })
                .catch(function onError(response) {
                    alert("FMS connection failed");
                });

            $mdDialog.show({
                controller: fontSpecimenController,
                templateUrl: "ng-modules/ng-templates/specimen.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen,
                locals : {
                    font: font
                }
            })
                .then(function () {
                })
        };
        
        $scope.showFontTester = function (ev, font) {
            $mdDialog.show({
                controller: fontTestController,
                templateUrl: "ng-modules/ng-templates/font_test.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen,
                locals : {
                    font: font
                }
            })
                .then(function () {
                })
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
        $scope.applyStyleToAll = true;
        $scope.unifiedLeft = true;
        $scope.unifiedRight = true;

        $scope.isFilledBucket = false;
        $scope.fontBucket = [];
        $scope.selectedFont = undefined;

        $scope.mainTitle = "maintitle";
        $scope.mainTitleControllers = false;
        $scope.mainTitleFont = undefined;
        $scope.mainTitleFontList = undefined;
        $scope.mainTitleFontSize = 70;

        $scope.subTitle = "subtitle";
        $scope.subTitleControllers = false;
        $scope.subTitleFont = undefined;
        $scope.subTitleFontList = undefined;
        $scope.subTitleFontSize = 40;
        
        $scope.textBody = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris risus ex, maximus vel dignissim et, auctor et lectus. Integer aliquet quam augue, eget venenatis ante fermentum in. Integer semper cursus nisi, non mattis ipsum pellentesque id. Donec auctor eros eu nunc vehicula posuere. Vivamus pharetra pulvinar molestie. Phasellus ullamcorper dui pretium, faucibus leo vel, hendrerit nisi. Etiam sed condimentum metus, quis vehicula nisl. Suspendisse sodales est lorem, eget luctus nisi egestas nec. Pellentesque rhoncus mi sed purus malesuada, quis laoreet lorem molestie. Sed nec purus elit. Nullam ut tortor congue, feugiat eros hendrerit, feugiat turpis.";
        $scope.textBodyControllers = false;
        $scope.textBodyFont = undefined;
        $scope.textBodyFontList = undefined;
        $scope.textBodyFontSize = 16;
        
        // set controllers on ng click
        $scope.mainTitleClick = function () {
            $scope.applyStyleToAll = false;
            $scope.mainTitleControllers = true;
            $scope.subTitleControllers = false;
            $scope.textBodyControllers = false;
        };

        $scope.subTitleClick = function () {
            $scope.applyStyleToAll = false;
            $scope.mainTitleControllers = false;
            $scope.subTitleControllers = true;
            $scope.textBodyControllers = false;
        };

        $scope.textBodyClick = function () {
            $scope.applyStyleToAll = false;
            $scope.mainTitleControllers = false;
            $scope.subTitleControllers = false;
            $scope.textBodyControllers = true;
        };
        
        // view behaviour change left side
        $scope.behaviourChangeLeft = function () {
            if ($scope.unifiedLeft) {
                $scope.unifiedLeft = false;
            } else {
                $scope.unifiedLeft = true;
            }
        };

        // view behaviour change right side
        $scope.behaviourChangeRight = function () {
            if ($scope.unifiedRight) {
                $scope.unifiedRight = false;
            } else {
                $scope.unifiedRight = true;
            }
        };

        // get bucket status
        var getBucketStatus = function () {
            $http.get("http://127.0.0.1:5000/fonts/status/chosen")
                .then(function onSuccess(response) {
                    $scope.isFilledBucket = response.data;
                })
                .catch(function onError(response) {
                    alert("FMS connection failed")
                });
        };

        // get font bucket list
        var getFontBucket = function () {
            if ($scope.isFilledBucket) {
                $http.get("http://127.0.0.1:5000/fonts/?" + "is_chosen=true")
                    .then(function onSuccess(response) {
                        $scope.fontBucket = response.data;
                    })
                    .catch(function onError(response) {
                        return {"error": "FMS connection failed"}
                    });
            } else {
                $http.get("http://127.0.0.1:5000/fonts")
                    .then(function onSuccess(response) {
                        $scope.fontBucket = response.data;
                    })
                    .catch(function onError(response) {
                        return {"error": "FMS connection failed"}
                    });
            }
        };


        /* option display on mouse hover */
        $scope.hoverIn = function () {
            this.hoverEdit = true;
        };

        $scope.hoverOut = function () {
            this.hoverEdit = false;
        };

        getBucketStatus();

        // load font bucket
        $timeout(function () {
            getFontBucket();
        }, 200);

        // left side view and functions
        $timeout(function () {
            $scope.selectedFontLeft = $scope.fontBucket[0];
            $scope.selectedFontRight = $scope.fontBucket[0];

            $scope.mainTitleFontList = angular.copy($scope.fontBucket);
            $scope.mainTitleFont = $scope.mainTitleFontList[0];

            $scope.subTitleFontList = angular.copy($scope.fontBucket);
            $scope.subTitleFont = $scope.subTitleFontList[0];

            $scope.textBodyFontList = angular.copy($scope.fontBucket);
            $scope.textBodyFont = $scope.textBodyFontList[0];

        }, 300);

    });
