/**
 * Created by lpsandaruwan on 1/22/17.
 */


var typecasesModule = angular.module("typecasesModule", []);


typecasesModule
    .controller("typecasesController", function ($http, $mdDialog, $scope, $timeout) {
        $scope.fontsList = undefined;
        $scope.viewId = {id: 2};
        $scope.textSize = 50;
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

        // get active fonts list
        var getActiveFontsList = function () {
            $http.get("http://127.0.0.1:5000/system/fonts")
                .then(function onSuccess(response) {
                    $scope.fontsList = response.data;
                })
                .catch(function onError(response) {
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
            getActiveFontsList();
        }, 100);

    });
