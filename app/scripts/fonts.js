/**
 * Created by lpsandaruwan on 11/28/16.
 */

angular
    .module("fonts", ['ngMaterial', 'ngMessages'])
    .controller("fonts", function ($filter, $http, $location, $mdDialog, $scope, $timeout) {

        $scope.error_message = "";
        $scope.error_occurs = false;
        $scope.font_list = null;
        $scope.font_styles = null;

        /* get all fonts list */
        var update_fonts_list = function () {
            $http.get("http://0.0.0.0:5000/font/all")
                .then(function (responce) {
                    $scope.font_list = responce.data;
                });
        };

        /* update a font data */
        var update_font_data = function (font) {
            $http.get("http://0.0.0.0:5000/font/one/" + font.font_id)
                .success(function (data, status, header, config) {
                    font.installed = data.installed;
                    font.status_color = data.status_color;
                })
        };
        
        /* update installable list */
        var update_installable_list = function () {
            $http.get("http://0.0.0.0:5000/font/installable")
                .then(function (responce) {
                    $scope.font_list = responce.data;
                });
        };
        
        /* update installed fonts list */
        var update_installed_list = function () {
            $http.get("http://0.0.0.0:5000/font/installed")
                .then(function (responce) {
                    $scope.font_list = responce.data;
                });
        };

        /* update upgradable fonts list */
        var update_upgradable_list = function () {
            $http.get("http://0.0.0.0:5000/font/upgradable")
                .then(function (responce) {
                    $scope.font_list = responce.data;
                });
        };

        /* install font */
        $scope.install_font = function (font) {
            font.in_progress = true;

            $http.get("http://0.0.0.0:5000/operation/install/" + font.font_id)
                .success(function (data, status, headers, config) {
                    if (data.version === font.version) {
                        font.in_progress = false;
                        update_font_data(font);
                    }
                })

                .error(function (data, status, headers, config) {
                    font.in_progress = false;
                });
        };

        /* remove font */
        $scope.remove_font = function (font) {
            font.in_progress = true;

            $http.get("http://0.0.0.0:5000/operation/remove/" + font.font_id)
                .success(function (data, status, headers, config) {
                    font.in_progress = false;
                    update_font_data(font);
                })

                .error(function (data, status, headers, config) {
                    font.in_progress = false;
                });
        };

        /* font dialog box */
        $scope.show_font_dialog = function(ev, font) {
            $mdDialog.show({

                controller: dialog_controller,
                templateUrl: 'font_dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.

                locals : {
                    font_data: [font, $scope.font_styles, $scope.install_font, $scope.remove_font]
                }
            })
                .then(function() {
                   update_fonts_list();
                });
        };
        

        var dialog_controller = function ($scope, $mdDialog, font_data) {
            
            $scope.font_styles = null;
            $scope.install_font = font_data[2];
            $scope.remove_font = font_data[3];
            $scope.selected_font = font_data[0];
            $scope.selected_font.in_progress = false;

            /* update font styles list */
            var update_font_styles_list = function (font) {
                $http.get("http://0.0.0.0:5000/font/web_link/" + font.font_id)
                    .then(function (responce) {
                        $scope.font_styles = responce.data;
                    });
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            update_font_styles_list($scope.selected_font);
        };
        
        update_fonts_list();
    });
