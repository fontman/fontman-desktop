/** Angular JS app
 *
 * Control fontman gui body.
 *
 * Created by Lahiru Pathirage @Mooniak <lpsandaruwan@gmail.com> on 11/28/16.
 */

angular
    .module('ng_app', ['all', 'install', 'installed', 'languages', 'navigation', 'ngRoute', 'repositories', 'refresh', 'settings', 'update'])
    .config( function ($routeProvider, $httpProvider, $locationProvider) {
        

       $routeProvider.when('/all', {
           templateUrl: 'views/all.html',
           controller: 'all'
       }).when('/install', {
           templateUrl: 'views/install.html',
           controller: 'install'
       }).when('/installed', {
           templateUrl: 'views/installed.html',
           controller: 'installed'
       }).when('/languages', {
           templateUrl:'views/languages.html',
           controller: 'languages'
       }).when('/repositories', {
           templateUrl: 'views/repositories.html',
           controller: 'repositories'
       }).when('/refresh', {
           templateUrl: 'views/refresh.html',
           controller: 'refresh'
       }).when('/settings', {
           templateUrl: 'views/settings.html',
           controller: 'settings'
       }).when('/update', {
           templateUrl: 'views/update.html',
           controller: 'update'
       }).otherwise('/all');
    });