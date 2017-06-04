/**
 * Doughnut Chart directive for bike usage
 */
(function() {
    'use strict';
    angular.module('app.dashboard')
        .directive('doughnutChart', function(rest) {
            return {
                restrict: 'A',
                scope: {
                    stations: '=stations'
                },
                templateUrl: "/components/dashboard/directives/doughnutChat/template.html",
                link: DoughnutChartLink
            };
            function DoughnutChartLink(scope, elem){

                var stationsStaticInfo = scope.stations.stationsInfo;
                var stationsStatus = scope.stations.stationsStatus;

                plotGlobalView(stationsStaticInfo, stationsStatus);

                /**
                 * Find the bike being used and bike available
                 * @param stationsStaticInfo
                 * @param stationsStatus
                 */
                function plotGlobalView(stationsStaticInfo, stationsStatus){
                    var total_available = 0;
                    var total_beingUsed = 0;
                    var data = [];
                    for(var i =0;  i < stationsStaticInfo.length ; i++){
                        var capacity = stationsStaticInfo[i].capacity;
                        var available = stationsStatus[stationsStaticInfo[i].station_id].num_bikes_available;
                        total_available += available;
                        total_beingUsed += capacity - available;
                    }
                    data.push(total_available);
                    data.push(total_beingUsed);
                    plot(data, document.getElementById("doughnut-global"));
                };


                /**
                 * Plot the graph for individual station for bike being used and bike available
                 *
                 * @param model Particular bike station model
                 */
                scope.plotIndividualView = function(model){
                    var data = [];
                    var capacity = model.capacity;
                    var available = stationsStatus[model.station_id].num_bikes_available;

                    data.push(available);
                    data.push(capacity - available);
                    plot(data, document.getElementById("doughnut-individual"));
                };
                scope.plotIndividualView(stationsStaticInfo[0]);

                /**
                 * Plot the chat for given data on the given element
                 *
                 * @param chartData Data to display in the graph
                 * @param element Dom element to display the
                 */
                function plot(chartData, element) {
                    var doughnutOptions = {};
                    var ctx = element.getContext("2d");
                    ctx.clearRect(0, 0, element.width, element.height);  // clear canvas view before adding the new
                    var data = {
                        type: 'doughnut',
                        data:  {
                            labels: ["Available", "Used"],
                            datasets: [{
                                label: 'Bike Usage',
                                data: chartData,
                                backgroundColor: [
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 99, 132, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255,99,132,1)',
                                ],
                                borderWidth: 1
                            }]},
                        options: doughnutOptions
                    };
                    new Chart(ctx, data);
                }
            }

        });

})();