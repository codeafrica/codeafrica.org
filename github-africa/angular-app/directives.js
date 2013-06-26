'use strict';

/* Directives */


angular.module('GithubAfrica.directives', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }])
    .directive('nvD3Chart', function () {
        var updateChart = function(newVal, oldVal, scope){
            if(newVal !== oldVal)
            {
                nv.addGraph(function() {
                    var chart = nv.models.multiBarHorizontalChart()
                        .x(function (d) {
                            return d.label
                        })
                        .y(function (d) {
                            return d.value
                        })
                        .margin({top: 30, right: 20, bottom: 50, left: 175})
                        .showValues(true)
                        .tooltips(false)
                        .showControls(false);

                    chart.yAxis
                        .tickFormat(d3.format(',d'));

                    d3.select(scope.element)
                        .datum(newVal)
                        .transition().duration(500)
                        .call(chart);

                    nv.utils.windowResize(chart.update);

                    return chart;
                });
            }
        };

        return {
            scope: { bind: '=' },
            link: function (scope, iElement, iAttrs, controller) {
                scope.element = iElement[0];
                scope.$watch('bind', updateChart, false);
            }
        }
    });