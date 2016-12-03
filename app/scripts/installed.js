/**
 * Created by lpsandaruwan on 11/28/16.
 */

angular
    .module('installed', [])
    .controller('installed', function ($http, $scope) {

        $scope.pageClass = 'animate';

        $scope.font_list = null;

        /* get installed fonts list */
        $http.get('http://0.0.0.0:5000/font/installed')
            .then(function (responce) {
                $scope.font_list = responce.data;
            });
});