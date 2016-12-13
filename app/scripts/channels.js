/**
 * Created by lpsandaruwan on 11/28/16.
 */

angular
    .module("channels", ['ngMaterial', 'ngMessages'])
    .controller("channels", function ($filter, $http, $location, $mdDialog, $scope, $timeout) {

        $scope.channels_list = null;
        
        /* add new channer */
        var add_new_font_controller = function ($http, $mdDialog, $scope) {
            $scope.in_progress = false;
            $scope.type = "github";

            $scope.channel = {
                channel_id: "",
                base_url: "",
                license_key: "",
                type: $scope.type
            };

            $scope.save_channel = function () {
                $scope.in_progress = true;
                
                $http.post("http://0.0.0.0:5000/channel/save", $scope.channel)
                    .success(function (data, status, header, config) {
                        $scope.in_progress = false;
                    })
                    .error(function (data, status, header, config) {

                    });

                $mdDialog.hide();
            };
            
            $scope.cancel = function () {
                $mdDialog.cancel();
            }
        };

        /* get channel information */
        var channel_info_controller = function ($http, $mdDialog, $scope, channel_id) {
            $scope.in_progress = false;
            $scope.channel = null;
            $scope.channel_id = channel_id;

            $http.get("http://0.0.0.0:5000/channel/info/" + $scope.channel_id)
                .success(function (data, status, header, config) {
                    $scope.channel = data;
                })
                .error(function (data, status, header, config) {

                });

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.refresh_cache = function (channel_id) {
                $scope.in_progress = true;

                $http.get("http://0.0.0.0:5000/channel/refresh/" + $scope.channel_id)
                    .success(function (data, status, header, config) {
                        $scope.in_progress = false;
                    })
                    .error(function (data, status, header, config) {

                    })
            };

            $scope.remove_channel = function (channel_id) {
                $scope.in_progress = true;

                $http.get("http://0.0.0.0:5000/channel/remove/" + channel_id)
                    .success(function (data, status, header, config) {
                        $scope.in_progress = false;
                    })
                    .error(function (data, status, header, config) {
                    });

                $mdDialog.hide();
            }
        };

        /* update all channels list */
        var update_channel_list = function () {
            $http.get("http://0.0.0.0:5000/channel/all")
                .success(function (data, status, header, config) {
                    $scope.channels_list = data;
                })
                .error(function (data, status, header, config) {

                })
        };

        /* toogle channel activate/deactivate */
        $scope.change_status = function (channel) {
            var is_active = false;

            if (!channel.is_active) {
                is_active = true;
            }

            $http.post(
                "http://0.0.0.0:5000/channel/status",
                {
                    "channel_id": channel.channel_id,
                    "is_active": is_active
                }
            )
                .success(function (data, status, headers, config) {
                    channel.is_active = is_active;
                })
                .error(function (data, status, headers, config) {
                    
                })
        };
        
        /* display channel add dialog */
        $scope.show_channel_add_dialog = function (ev) {
            $mdDialog.show({
                controller: add_new_font_controller,
                templateUrl: 'add_channel.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
            })
                .then(function () {
                    update_channel_list();
                })
        };

        $scope.show_channel_info = function (ev, _channel_id) {
            $mdDialog.show({
                controller: channel_info_controller,
                templateUrl: 'channel_info.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.

                locals: {
                    channel_id: _channel_id
                }
            })
                .then(function () {
                    update_channel_list();
                })
        };

        update_channel_list();
});