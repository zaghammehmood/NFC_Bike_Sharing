/**
 * Doughnut Chart directive for bike usage
 */
(function() {
    'use strict';
    angular.module('app.dashboard')
        .directive('minuteWiseUsage', function(rest) {
            return {
                restrict: 'A',
                scope: {
                    stations: '=stations'
                },
                templateUrl: "/components/dashboard/directives/minute-wise-usage/template.html",
                link: MinuteWiseUsageLink
            };
            function MinuteWiseUsageLink(scope, elem){

                var stationsStaticInfo = scope.stations.stationsInfo;
                var stationsStatus = scope.stations.stationsStatus;


                plot([1, 81, 5], "inidividual", document.getElementById('minute-wise'));

                /**
                 * Plot the chat for given data on the given element
                 *
                 * @param chartData Data to display in the graph
                 * @param element Dom element to display the
                 */
                function plot(chartData, title, element) {
                    var chartOptions = {
                            layout: {
                                padding: {
                                    left: 20,
                                    right: 20,
                                    top: 20,
                                    bottom: 20
                                }
                            },
                        title: {
                            display: true,
                            text: title+ " Bike Usage",
                            position: 'top'
                        },
                        legend:{
                            position: 'right',
                            labels: {
                                usePointStyle: true
                            }
                        }
                    };
                    var ctx = element.getContext("2d");
                    ctx.clearRect(0, 0, element.width, element.height);  // clear canvas view before adding the new
                    var data = {
                        type: 'bar',
                        data:  {
                            labels: ["1 min", "2 min", "3 min"],
                            datasets: [{
                                label: 'Bike Usage',
                                data: chartData,
                                backgroundColor: [
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 99, 132, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255,99,132,1)'
                                ],
                                borderWidth: 1
                            }]},
                        options: chartOptions
                    };
                    new Chart(ctx, data);
                }
            }

        });

})();
