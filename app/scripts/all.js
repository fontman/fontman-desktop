/**
 * Created by lpsandaruwan on 11/28/16.
 */

angular
    .module('all', ['ngAnimate'])
    .controller('all', function ($http, $scope, $timeout) {

        $scope.font_files = null;
        $scope.font_list = null;
        $scope.font_sample = null;
        $scope.pageClass = 'animate';
        $scope.selected_font = null;
        
        /* get all fonts list */
        $http.get('http://0.0.0.0:5000/font/all')
            .then(function (responce) {
                $scope.font_list = responce.data;
                $scope.select_font($scope.font_list[0]);
            });

        /* set font status color */
        var get_status_color = function (font) {
            $http.get('http://0.0.0.0:5000/font/check/upgradable/' + font.font_id)
                .then(function (responce) {
                    if(responce.data) {
                        font.status_color = {color: "#fdbc40"};
                    }
                    else {
                        $http.get('http://0.0.0.0:5000/font/check/installed/' + font.font_id)
                            .then(function (responce) {
                                if(responce.data) {
                                    font.status_color = {color: "#34c84a"};
                                }
                                else {
                                    font.status_color = {color: "#57acf5"};
                                }
                            });
                    }
                });
        };

        /* update sample text */
        var update_text_sample = function (font) {
            $http.get('http://0.0.0.0:5000/font/sample/' + font.font_id)
                .then(function (responce) {
                    $scope.font_sample = responce.data["sample"];
                });
        };

        /* update font faces list */
        var update_web_links = function (font) {
            $http.get('http://0.0.0.0:5000/font/web_link/' + font.font_id)
                .then(function (responce) {
                    $scope.font_files = responce.data;
                });
        };
        
        $scope.status_color = function (font) {
            font.status_color = get_status_color(font);
        };

        /* select font and animate body options */
        $scope.select_font = function (font) {

            $scope.change_is_on = true;

            $timeout(function () {
                $scope.selected_font = font;
                $scope.change_is_on = false;

                update_text_sample(font);
                update_web_links(font);

            }, 250);

        };

    });