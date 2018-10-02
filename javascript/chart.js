function JSONtoCSV(json) {
    var string = '';
    var line = '';
    for (var key in json[0]) {
        if (line != '') line += ',';
        line += key
    }
    string += line + '\n';
    for (var count = 0; count < json.length; count++) {
        line = '';
        for (var index in json[count]) {
            if (line != '') line += ',';
            line += json[count][index]
        }
        string += line + '\n'
    }
    return string
}

function JSONtoKeys(json, key) {
    var keys = [];
    json.forEach(function (row) {
        keys.push(row[key])
    });
    return keys
}

function JSONtoData(json, key, value) {
    var data = {};
    json.forEach(function (row) {
        data[row[key]] = row[value]
    });
    return data
}

function Analyser(options) {
    switch (options.type) {
        case 'Dygrphs':
            Dygrphs(options);
            break;
        case 'C3':
            C3(options);
            break
    }
}

function Dygrphs(options) {
    var graph = null;
    $.getJSON(options.url, function (data) {
        graph = new Dygraph(document.getElementById(options.id), JSONtoCSV(data), {
            width: options.style.width,
            heigth: options.style.height,
            valueRange: options.chart.valueRange,
            rollPeriod: options.chart.rollPeriod,
            errorBars: options.chart.errorBars,
            axisLineColor: options.style.color,
            gridLineColor: options.style.color,
            colors: options.chart.style.pattern,
            strokeWidth: options.chart.style.stroke.width,
        })
    });
    DyGraphs_ColorChange(options);
    window.intervalId = setInterval(function () {
        $.getJSON(options.url, function (data) {
            graph.updateOptions({
                'file': JSONtoCSV(data)
            })
        })
    }, options.chart.interval)
}

function C3(options) {
    switch (options.chart.type) {
        case 'Line':
            (function LineChart() {
                var chart = null;
                $.getJSON(options.url, function (data) {
                    chart = c3.generate({
                        bindto: '#' + options.id,
                        data: {
                            json: data,
                            keys: {
                                x: options.chart.x,
                                value: options.chart.keys
                            }
                        },
                        color: {
                            pattern: options.chart.style.pattern
                        },
                        axis: {
                            x: {
                                type: 'categories'
                            }
                        }
                    })
                });
                C3_ColorChange(options)
            })();
            break;
        case 'Pie':
            (function PieChart() {
                var chart = null;
                $.getJSON(options.url, function (data) {
                    chart = c3.generate({
                        bindto: '#' + options.id,
                        data: {
                            json: [JSONtoData(data, options.chart.key, options.chart.value)],
                            type: 'pie',
                            keys: {
                                value: JSONtoKeys(data, options.chart.key)
                            }
                        },
                        color: {
                            pattern: options.chart.style.pattern
                        }
                    })
                });
                C3_ColorChange(options)
            })();
            break
    }
}

function C3_ColorChange(options) {
    var styleElement = document.createElement('style'),
        styleSheet;
    document.head.appendChild(styleElement);
    styleSheet = styleElement.sheet;
    styleSheet.addRule('#' + options.id + '', 'background-color: ' + options.style.background);
    styleSheet.addRule('#' + options.id + ' .domain', 'stroke: ' + options.style.color);
    styleSheet.addRule('#' + options.id + ' .c3-legend-item', 'fill: ' + options.style.color);
    switch (options.chart.type) {
        case 'Line':
            styleSheet.addRule('#' + options.id + ' .c3-axis', 'fill: ' + options.style.color);
            styleSheet.addRule('#' + options.id + ' .c3-line', 'stroke-width: ' + options.chart.style.stroke.width);
            styleSheet.addRule('#' + options.id + ' .c3-circle', 'r: ' + options.chart.style.stroke.width);
            break;
        case 'Pie':
            styleSheet.addRule('#' + options.id + ' .c3-chart-arc path', 'stroke: ' + options.style.background);
            break
    }
}

function DyGraphs_ColorChange(options) {
    var styleElement = document.createElement('style'),
        styleSheet;
    document.head.appendChild(styleElement);
    styleSheet = styleElement.sheet;
    styleSheet.addRule('#' + options.id + '', 'background-color: ' + options.style.background);
    styleSheet.addRule('#' + options.id + ' .dygraph-axis-label', 'color: ' + options.style.color);
    styleSheet.addRule('#' + options.id + ' .dygraph-legend', 'background: ' + options.style.background);
    styleSheet.addRule('#' + options.id + ' .dygraph-legend', 'color: ' + options.style.color)
}