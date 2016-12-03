/**
 * Created by lpsandaruwan on 11/28/16.
 */

angular
    .module('update', [])
    .controller('update', function ($http, $scope) {

        $scope.pageClass = 'animate';

        $scope.font_list = null;

        /* get available updates */
        $http.get('http://0.0.0.0:5000/font/upgradable')
            .then(function (responce) {
                $scope.font_list = responce.data;
            });
});