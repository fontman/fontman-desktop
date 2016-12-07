/**
 * Created by lpsandaruwan on 11/28/16.
 */

angular
    .module("fonts", ['ngMaterial'])
    .controller("fonts", function ($http, $scope, $timeout) {

        $scope.font_files = null;
        $scope.font_list = null;
        $scope.pageClass = "fonts";
        $scope.selected_font = null;
        
        /* get all fonts list */
        $http.get("http://0.0.0.0:5000/font/all")
            .then(function (responce) {
                $scope.font_list = responce.data;
            });

        /* update font faces list */
        var update_web_links = function (font) {
            $http.get("http://0.0.0.0:5000/font/web_link/" + font.font_id)
                .then(function (responce) {
                    $scope.font_files = responce.data;
                });
        };

    });