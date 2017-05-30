(function(){
    'use strict';

    angular.module('app.dashboard', [
        'ngRoute',
        'app.rest',
        "ui.select"
    ])
        .config(['$routeProvider', function($routeProvider){
            $routeProvider.when('/dashboard', {
                templateUrl: '/components/dashboard/views/dashboard.html',
                controller: 'DashboardController'
            });
            //uiGmapGoogleMapApiProvider.configure({
            //    key: 'AIzaSyBB7RP8f8zBnp03moTvZBVySj9bmcL6uEQ',
            //    v: '3.27', //defaults to latest 3.X anyhow
            //    libraries: 'weather,geometry,visualization'
            //});
    }]);


})();