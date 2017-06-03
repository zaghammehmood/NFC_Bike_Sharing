/**
 * Doughnut Chart directive for bike usage
 */
(function() {
    'use strict';
    angular.module('app.dashboard')
        .directive('stationsMapView', function() {
            return {
                restrict: 'A',
                scope: {
                    map: "=",
                    stations: "="
                },
                templateUrl: "/components/dashboard/directives/stationsMapView/template.html",
                link: mapLink
            };
            function mapLink(scope, elem, attr){

                scope.queryInfo = {
                    selectedStation: "",
                    distance : 0
                };

                var stationsStaticInfo = scope.stations.stationsInfo;
                var stationsStatus = scope.stations.stationsStatus;
                var markers = [];

                renderMap(stationsStaticInfo, stationsStatus);

                scope.updateMap = function(){
                    var lat = scope.queryInfo.selectedStation.lat;
                    var lng = scope.queryInfo.selectedStation.lon;
                    var qDistance = parseInt(scope.queryInfo.distance);
                    var centerPoint = new google.maps.LatLng(lat, lng);

                    for (var i = 0; i < markers.length; i++) {
                        // checks the distance make the marker visible false
                        var distance = calculateDistance(centerPoint, markers[i].getPosition());
                        distance <= qDistance ?   markers[i].setVisible(true) :  markers[i].setVisible(false);
                    }
                };

                function calculateDistance(pointA, pointB){
                    return (google.maps.geometry.spherical.computeDistanceBetween(pointA, pointB)/ 1000).toFixed(2);
                };

                /**
                 *
                 * @param stationsStaticInfo
                 * @param stationsStatus
                 */

                function renderMap(stationsStaticInfo, stationsStatus) {

                    var map = new google.maps.Map(document.getElementById('map_canvas'), scope.map);
                    var bounds = new google.maps.LatLngBounds();
                        map.fitBounds(bounds);

                    for (var i = 0; i < stationsStaticInfo.length; i++) {
                        markers.push(createMarker(stationsStaticInfo[i], stationsStatus[stationsStaticInfo[i].station_id]));
                    }

                    markers.forEach(function(marker, index){
                        marker.setMap(map);
                        bounds.extend(marker.getPosition());
                    });

                    /**
                     * Create the marker for particular
                     *
                     * @param stationInfo Particular station info
                     * @param stationStatus Dynamic info for the particular station
                     */
                     function createMarker(stationInfo, stationStatus) {

                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng({
                                lng: stationInfo.lon,
                                lat: stationInfo.lat
                            }),
                            title: stationInfo.name,
                            icon: "http://maps.google.com/mapfiles/ms/icons/" + getMarkerColor(stationInfo.capacity, stationStatus.num_bikes_available)
                        });

                        var html = "<h6>" + stationInfo.name + "</h6>";
                        html += 'Available Bikes: ' + stationStatus.num_bikes_available;

                        var infowindow = new google.maps.InfoWindow({
                            content: html
                        });
                        google.maps.event.addListener(marker, 'mouseover', function () {
                            infowindow.open(map, marker);
                        });
                        google.maps.event.addListener(marker, 'mouseout', function () {
                            infowindow.close();
                        });

                        return marker;

                    };

                    /**
                     * Get the marker color based on the % of bikes available
                     *
                     * @param capacity Total bikes on the station
                     * @param avalible  Available bikes on given time
                     * @returns {*}
                     */

                     function getMarkerColor(capacity, avalible) {
                        var percentage = avalible / capacity * 100;
                        if (percentage == 0) {
                            return "red-dot.png";
                        } else if (percentage < 50) {
                            return "orange-dot.png"
                        } else if (percentage > 75) {
                            return "green-dot.png";
                        }
                        return "pink-dot.png";   // Assumption: If the bikes available are between it is between 50 to 75 %
                    };
                }
            }
        });
})();