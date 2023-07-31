var myChart;

self.onInit = function() {

    var chartData = {
        datasets: []
    };

    for (var i = 0; i < self.ctx.data.length; i++) {
        var dataKey = self.ctx.data[i].dataKey;
        var dataset = {
            label: dataKey.label,
            data: [],
            backgroundColor: dataKey.color,
            fill: false,
        };
        chartData.datasets.push(dataset);
    }

    var options = {
        maintainAspectRatio: false,
        legend: {
            display: true,
        },
        scales: {
            xAxes: [{
                type: 'time',
                ticks: {
                    maxRotation: 0,
                    autoSkipPadding: 30
                }
            }]
        }
    };

    var canvasElement = $('#myChart', self.ctx
        .$container)[0];
    var canvasCtx = canvasElement.getContext('2d');
    myChart = new Chart(canvasCtx, {
        type: 'bar',
        data: chartData,
        options: options
    });
    self.onResize();
}

self.onResize = function() {
    myChart.resize();
}

self.onDataUpdated = function() {
    for (var i = 0; i < self.ctx.data.length; i++) {
        var datasourceData = self.ctx.data[i];
        var dataSet = datasourceData.data;
        myChart.data.datasets[i].data.length = 0;
        var data = myChart.data.datasets[i].data;
        for (var d = 0; d < dataSet.length; d++) {
            var tsValuePair = dataSet[d];
            var ts = tsValuePair[0];
            var value = tsValuePair[1];
            data.push({
                t: ts,
                y: value
            });
        }
    }
    myChart.options.scales.xAxes[0].ticks.min = self.ctx
        .timeWindow.minTime;
    myChart.options.scales.xAxes[0].ticks.max = self.ctx
        .timeWindow.maxTime;
    myChart.update();
}