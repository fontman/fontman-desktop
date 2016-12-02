/**
 * Created by lpsandaruwan on 11/28/16.
 */

angular
    .module('all', [])
    .controller('all', function ($http, $scope) {

        $scope.pageClass = 'animate';

        $scope.font_list = null;
        
        $http.get('http://0.0.0.0:5000/font/all')
            .then(function (responce) {
                $scope.font_list = responce.data;
            });

        /* set font status color */
        var get_status_color = function (font) {

            $http.get('http://0.0.0.0:5000/font/check/update/' + font.id)
                .then(function (responce) {
                    if(responce.data) {
                        font.status_color = {color: "#fdbc40"};
                    }
                    else {
                        $http.get('http://0.0.0.0:5000/font/check/install/' + font.id)
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
        }
});

