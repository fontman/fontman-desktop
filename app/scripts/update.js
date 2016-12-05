/**
 * Created by lpsandaruwan on 11/28/16.
 */

angular
    .module('update', [])
    .controller('update', function ($http, $scope) {

        $scope.pageClass = 'animate';
        $scope.font_list = null;
        $scope.selected_font = null;

        /* get available updates */
        $http.get('http://0.0.0.0:5000/font/upgradable')
            .then(function (responce) {
                $scope.font_list = responce.data;
                $scope.selected_font = $scope.font_list[0];
            });

        /* select font and animate body options */
        $scope.select_font = function (font) {
            $scope.change_is_on = true;

            $timeout(function () {
                $scope.selected_font = font;
                $scope.change_is_on = false;
            }, 250);
        };
});