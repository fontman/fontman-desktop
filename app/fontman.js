/** Angular JS app
 *
 * Control fontman gui body.
 *
 * Created by Lahiru Pathirage @Mooniak <lpsandaruwan@gmail.com> on 11/28/16.
 */

var fontman = angular.module(
    "fontman",
    ["about", "fonts", "ngAnimate", "ngMaterial", "ngMdIcons", "ngMessages", "ngRoute", "channels", "preferences"]
);


fontman
    .config( function ($routeProvider, $httpProvider, $locationProvider) {

        $routeProvider

            .when("/about", {
                templateUrl: "views/about.html",
                controller: "about"
            })
            
            .when("/channels", {
                templateUrl: "views/channels.html", 
                controller: "channels"
            })
            
            .when("/fonts", {
                templateUrl: "views/fonts.html", 
                controller: "fonts"
            })
            
            .when("/preferences", {
                templateUrl: "views/preferences.html", 
                controller: "preferences"
            })

            .otherwise("/fonts");
    
    });

fontman
    .controller("fontman-navigation", function () {
       this.current_nav_item = "fonts";
    });