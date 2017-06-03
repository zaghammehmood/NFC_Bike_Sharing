/**
 *  Controller for maps
 */

(function(){
    'use strict';
    angular.module('app.dashboard')
        .controller('DashboardController', function($scope, rest) {

            $scope.stations = {};

            rest.getStationInfo().then(function(response){
                $scope.stations.stationsInfo = response.data.stations;
                return rest.getStationsStatus();
            }).then(function(response){
                $scope.stations.stationsStatus = _.keyBy(response.data.stations, function(obj){
                    return obj.station_id;
                });
                $scope.data = true;
            }).catch(function(err){
                console.log(err);
            });

            $scope.map = {
                center: {
                    lat: 40.1451,
                    lng: -99.6680
                },
                zoom: 8
            };

        });
})();
