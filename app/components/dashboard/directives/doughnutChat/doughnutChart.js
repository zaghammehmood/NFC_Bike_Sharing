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

                scope.updateGraph = function(model){
                    console.log( model);
                };

                plot();

                /**
                 * Put data into actual chart.
                 * @param data
                 */
                function plot() {

                    var doughnutOptions = {};
                    var ctx = document.getElementById("doughnut-individual").getContext("2d");
                    var data = {
                        type: 'pie',
                        data:  {
                            labels: ["Available", "Used"],
                            datasets: [{
                                label: 'Bike Usage',
                                data: [12, 19],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255,99,132,1)',
                                    'rgba(54, 162, 235, 1)'
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