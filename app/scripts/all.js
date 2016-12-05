/**
 * Created by lpsandaruwan on 11/28/16.
 */

angular
    .module('all', ['ngAnimate'])
    .controller('all', function ($http, $scope, $timeout) {

        $scope.pageClass = 'animate';
        $scope.font_list = null;
        $scope.selected_font = null;
        
        /* get all fonts list */
        $http.get('http://0.0.0.0:5000/font/all')
            .then(function (responce) {
                $scope.font_list = responce.data;
                $scope.selected_font = $scope.font_list[0];
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
        
        $scope.status_color = function (font) {
            font.status_color = get_status_color(font);
        };

        /* select font and animate body options */
        $scope.select_font = function (font) {
            $scope.change_is_on = true;

            $timeout(function () {
                $scope.selected_font = font;
                $scope.change_is_on = false;
            }, 250);
        };

    });