/**
 * Created by lpsandaruwan on 11/28/16.
 */

angular
    .module("fonts", ['ngMaterial', 'ngMessages'])
    .controller("fonts", function ($http, $mdDialog, $scope, $timeout) {

        $scope.font_list = null;
        $scope.font_styles = null;
        $scope.pageClass = "fonts";

        /* get all fonts list */
        $http.get("http://0.0.0.0:5000/font/all")
            .then(function (responce) {
                $scope.font_list = responce.data;
                update_font_styles_list($scope.font_list[0])
            });
        

        var update_font_styles_list = function (font) {
            $http.get("http://0.0.0.0:5000/font/web_link/" + font.font_id)
                .then(function (responce) {
                    $scope.font_styles = responce.data;
                });
        };

        /* font dialog box */
        $scope.show_font_dialog = function(ev, font) {

            /* update font styles list */
            update_font_styles_list(font);
            
            $mdDialog.show({

                controller: dialog_controller,
                templateUrl: 'font_dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.

                locals : {
                    font_data: [font, $scope.font_styles]
                }

            })
                
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                    
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };
        

        var dialog_controller = function ($scope, $mdDialog, font_data) {

            $scope.font_styles = font_data[1];
            $scope.selected_font = font_data[0];
            
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };

        };

    });
