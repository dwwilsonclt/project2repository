var charts = function() {
    var genderChart = function() {
        $.post("/dashboard/admin/stats/chart/1")
        .done(function(data) {
            var chart = AmCharts.makeChart("chart_1", {
                type: "pie",
                theme: "light",
                addClassNames: true,
                labelsEnabled: false,
                autoMargins: false,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0,

                fontFamily: 'Open Sans',

                color:    '#888',

                dataProvider: data,
                balloon: {
                    fontSize: 16
                },
                legend: {
                    position: "bottom",
                    autoMargins: false
                },
                defs: {
                    filter: [{
                        id: "shadow",
                        width: "200%",
                        height: "200%",
                        feOffset: {
                            result: "offOut",
                            in: "SourceAlpha",
                            dx: 0,
                            dy: 0
                        },
                        feGaussianBlur: {
                            result: "blurOut",
                            in: "offOut",
                            stdDeviation: 5
                        },
                        feBlend: {
                            in: "SourceGraphic",
                            in2: "blurOut",
                            mode: "normal"
                        }
                    }]
                },
                valueField: "students",
                titleField: "gender"
            });

            chart.addListener("rollOverSlice", function(e) {
                handleRollOver(e);
            });

            function handleRollOver(e){
                var wedge = e.dataItem.wedge.node;
                wedge.parentNode.appendChild(wedge);
            }

            // $('#chart_1').closest('.portlet').find('.fullscreen').click(function() {
            //     chart.invalidateSize();
            // });
        });
    };

    var classLevelChart = function() {
        $.post("/dashboard/admin/stats/chart/2")
         .done(function(data) {
             AmCharts.addInitHandler(function(chart) {
                 for(var i = 0; i < chart.graphs.length; i++) {
                     var graph = chart.graphs[i];
                     if (graph.autoColor !== true)
                         continue;
                     var colorKey = "autoColor-"+i;
                     graph.lineColorField = colorKey;
                     graph.fillColorsField = colorKey;
                     for(var x = 0; x < chart.dataProvider.length; x++) {
                         var color = chart.colors[x];
                         chart.dataProvider[x][colorKey] = color;
                     }
                 }

                 if (!chart.legend || !chart.legend.enabled || !chart.legend.generateFromData) {
                     return;
                 }

                 var categoryField = chart.categoryField;
                 var colorField = chart.graphs[0].lineColorField || chart.graphs[0].fillColorsField;
                 var legendData =  chart.dataProvider.map(function(data) {
                     var markerData = {
                         "title": data[categoryField] + ": " + data[chart.graphs[0].valueField],
                         "color": data[colorField]
                     };
                     if (!markerData.color) {
                         markerData.color = chart.graphs[0].lineColor;
                     }
                     return markerData;
                 });

                 chart.legend.data = legendData;

             }, ["serial"]);

             var chart = AmCharts.makeChart("chart_2", {
                 type: "serial",
                 theme: "light",
                 legend: {
                     generateFromData: true
                 },
                 autoMargins: false,
                 marginLeft: 70,
                 marginRight: 30,
                 marginTop: 10,
                 marginBottom: 26,

                 fontFamily: 'Open Sans',
                 color:    '#888',

                 dataProvider: data,
                 synchronizeGrid: true,
                 valueAxes: [{
                     id: "studentsAxis",
                     axisAlpha: 1,
                     position: "left",
                     title: "Students"
                 }],
                 startDuration: 1,
                 graphs: [
                     {
                         alphaField: "alpha",
                         balloonText: "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b> [[additional]]</span>",
                         dashLengthField: "dashLengthColumn",
                         fillAlphas: 1,
                         title: "Students",
                         type: "column",
                         valueField: "students",
                         valueAxis: "studentsAxis",
                         autoColor: true
                     }
                 ],
                 chartCursor: {
                     categoryBalloonEnabled: false,
                     cursorAlpha: 0,
                     zoomable: false
                 },
                 categoryField: "class_level",
                 categoryAxis: {
                     gridPosition: "start",
                     axisAlpha: 0,
                     tickLength: 0
                 }
             });

             // $('#chart_2').closest('.portlet').find('.fullscreen').click(function() {
             //     chart.invalidateSize();
             // });
         });
    };

    var studentsByDepartmentChart = function() {
        $.post("/dashboard/admin/stats/chart/3")
         .done(function(data) {
             var chart = AmCharts.makeChart("chart_3", {
                 type: "pie",
                 theme: "light",
                 addClassNames: true,

                 fontFamily: 'Open Sans',

                 color:    '#888',

                 dataProvider: data,
                 balloon: {
                     fontSize: 16
                 },
                 legend: {
                     position: "right",
                     marginRight: 100,
                     fontSize: 16,
                     autoMargins: false
                 },
                 innerRadius: "30%",
                 defs: {
                     filter: [{
                         id: "shadow",
                         width: "200%",
                         height: "200%",
                         feOffset: {
                             result: "offOut",
                             in: "SourceAlpha",
                             dx: 0,
                             dy: 0
                         },
                         feGaussianBlur: {
                             result: "blurOut",
                             in: "offOut",
                             stdDeviation: 5
                         },
                         feBlend: {
                             in: "SourceGraphic",
                             in2: "blurOut",
                             mode: "normal"
                         }
                     }]
                 },
                 valueField: "students",
                 titleField: "department"
             });

             chart.addListener("rollOverSlice", function(e) {
                 handleRollOver(e);
             });

             function handleRollOver(e){
                 var wedge = e.dataItem.wedge.node;
                 wedge.parentNode.appendChild(wedge);
             }

             // $('#chart_3').closest('.portlet').find('.fullscreen').click(function() {
             //     chart.invalidateSize();
             // });
         });
    };

    var professorsByDepartmentChart = function() {
        $.post("/dashboard/admin/stats/chart/4")
         .done(function(data) {
             var chart = AmCharts.makeChart("chart_4", {
                 type: "pie",
                 theme: "light",
                 addClassNames: true,

                 fontFamily: 'Open Sans',

                 color:    '#888',

                 dataProvider: data,
                 balloon: {
                     fontSize: 16
                 },
                 legend: {
                     position: "right",
                     marginRight: 100,
                     fontSize: 16,
                     autoMargins: false
                 },
                 innerRadius: "30%",
                 defs: {
                     filter: [{
                         id: "shadow",
                         width: "200%",
                         height: "200%",
                         feOffset: {
                             result: "offOut",
                             in: "SourceAlpha",
                             dx: 0,
                             dy: 0
                         },
                         feGaussianBlur: {
                             result: "blurOut",
                             in: "offOut",
                             stdDeviation: 5
                         },
                         feBlend: {
                             in: "SourceGraphic",
                             in2: "blurOut",
                             mode: "normal"
                         }
                     }]
                 },
                 valueField: "professors",
                 titleField: "department"
             });

             chart.addListener("rollOverSlice", function(e) {
                 handleRollOver(e);
             });

             function handleRollOver(e){
                 var wedge = e.dataItem.wedge.node;
                 wedge.parentNode.appendChild(wedge);
             }

             // $('#chart_4').closest('.portlet').find('.fullscreen').click(function() {
             //     chart.invalidateSize();
             // });
         });
    };

    return {
        init: function() {
            genderChart();
            classLevelChart();
            studentsByDepartmentChart();
            professorsByDepartmentChart();
        }
    }
}();

$(document).ready(function() {
    charts.init();
});