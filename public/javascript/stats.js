var charts = function() {
    var genderChart = function() {
        $.post("/dashboard/admin/stats/chart/1")
        .done(function(data) {
            var chart = AmCharts.makeChart("chart_1", {
                type: "pie",
                theme: "light",
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
                valueField: "students",
                titleField: "gender"
            });

            // $('#chart_1').closest('.portlet').find('.fullscreen').click(function() {
            //     chart.invalidateSize();
            // });
        });
    };

    var classLevelChart = function() {
        $.post("/dashboard/admin/stats/chart/2")
         .done(function(data) {
             var chart = AmCharts.makeChart("chart_2", {
                 type: "pie",
                 theme: "light",
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
                 valueField: "students",
                 titleField: "class_level"
             });

             // $('#chart_1').closest('.portlet').find('.fullscreen').click(function() {
             //     chart.invalidateSize();
             // });
         });
    };

    var departmentChart = function() {
        $.post("/dashboard/admin/stats/chart/3")
         .done(function(data) {
             var chart = AmCharts.makeChart("chart_3", {
                 type: "pie",
                 theme: "light",
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
                 valueField: "students",
                 titleField: "department"
             });

             // $('#chart_1').closest('.portlet').find('.fullscreen').click(function() {
             //     chart.invalidateSize();
             // });
         });
    };

    return {
        init: function() {
            genderChart();
            classLevelChart();
            departmentChart();
        }
    }
}();

$(document).ready(function() {
    charts.init();
});