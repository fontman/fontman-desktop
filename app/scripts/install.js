/**
 * Created by lpsandaruwan on 11/28/16.
 */

angular
    .module('install', [])
    .controller('install', function ($http, $scope) {

        $scope.pageClass = 'animate';

        $scope.font_list = null;

        /* get available fonts list */
        $http.get('http://0.0.0.0:5000/font/installable')
            .then(function (responce) {
                $scope.font_list = responce.data;
            });
});
