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
        keys.push(row[key]);
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

function OptionsisNaN(options) {
    if (options.id == undefined) throw "no ID";
    if (options.style == undefined) throw "no STYLE";
    if (options.type == undefined) throw "no TYPE";
    if (options.url == undefined) throw "no URL";
    if (options.chart == undefined) throw "no CHART";

    return options;
}

function Charting(options) {
    switch (options.type) {
        case 'Dygrphs':
            Dygrphs(options);
            break;
        case 'C3':
            C3(OptionsisNaN(options));
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
            strokeWidth: options.chart.style.width
        });
    });
    DyGraphs_ColorChange(options);
    window.intervalId = setInterval(function () {
        $.getJSON(options.url, function (data) {
            graph.updateOptions({
                'file': JSONtoCSV(data)
            });
        })
    }, options.chart.interval);
}

function C3(options) {
    switch (options.chart.type) {
        case 'Line':
            (function LineCharting() {
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
                        },
                        legend: {
                            show: options.chart.style.legend.show,
                            position: options.chart.style.legend.position
                        }
                    });
                });
                C3_ColorChange(options);
            })();
            break;
        case 'Spline':
            (function LineCharting() {
                var chart = null;
                $.getJSON(options.url, function (data) {
                    chart = c3.generate({
                        bindto: '#' + options.id,
                        data: {
                            json: data,
                            type: 'spline',
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
                        },
                        legend: {
                            show: options.chart.style.legend.show,
                            position: options.chart.style.legend.position
                        }
                    });
                });
                C3_ColorChange(options);
            })();
            break;
        case 'Pie':
            (function PieCharting() {
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
                        },
                        pie: {
                            title: options.chart.title,
                            label: {
                                show: options.chart.style.label
                            }
                        },
                        legend: {
                            show: options.chart.style.legend.show,
                            position: options.chart.style.legend.position
                        }
                    });
                });
                C3_ColorChange(options);
            })();
            break;
        case 'Donut':
            (function DonutCharting() {
                var chart = null;
                $.getJSON(options.url, function (data) {
                    chart = c3.generate({
                        bindto: '#' + options.id,
                        data: {
                            json: [JSONtoData(data, options.chart.key, options.chart.value)],
                            type: 'donut',
                            keys: {
                                value: JSONtoKeys(data, options.chart.key)
                            }
                        },
                        color: {
                            pattern: options.chart.style.pattern
                        },
                        donut: {
                            title: options.chart.title,
                            width: options.chart.style.width,
                            label: {
                                show: options.chart.style.label
                            }
                        },
                        legend: {
                            show: options.chart.style.legend.show,
                            position: options.chart.style.legend.position
                        }
                    });
                });
                C3_ColorChange(options);
            })();
            break;
        case 'Gauge':
            (function GaugeCharting() {
                var chart = null;
                $.getJSON(options.url, function (data) {
                    chart = c3.generate({
                        bindto: '#' + options.id,
                        data: {
                            json: data,
                            type: 'gauge',
                        },
                        color: {
                            pattern: options.chart.style.pattern,
                            threshold: options.chart.style.threshold
                        },
                        gauge: {
                            title: options.chart.title,
                            width: options.chart.style.width,
                            label: {
                                show: options.chart.style.label
                            }
                        },
                        legend: {
                            show: options.chart.style.legend.show,
                            position: options.chart.style.legend.position
                        }
                    });
                });
                C3_ColorChange(options);
            })();
            break;
    }
}

function CreateStyleSheet() {
    var styleElement = document.createElement('style');
    var styleSheet = null;

    document.head.appendChild(styleElement);
    styleSheet = styleElement.sheet;

    return styleSheet;
}

function C3_ColorChange(options) {
    var DOM = '#' + options.id;
    var styleSheet = CreateStyleSheet();

    styleSheet.addRule(DOM + '', 'background-color: ' + options.style.background);
    styleSheet.addRule(DOM + ' .domain', 'stroke: ' + options.style.color);
    styleSheet.addRule(DOM + ' .c3-legend-item', 'fill: ' + options.style.color);
    switch (options.chart.type) {
        case 'Line':
        case 'Spline':
            styleSheet.addRule(DOM + ' .c3-axis', 'fill: ' + options.style.color);
            styleSheet.addRule(DOM + ' .c3-line', 'stroke-width: ' + options.chart.style.width);
            styleSheet.addRule(DOM + ' .c3-circle', 'r: ' + options.chart.style.width);
            break;
        case 'Pie':
        case 'Donut':
        case 'Gauge':
            styleSheet.addRule(DOM + ' .c3-chart-arc path', 'stroke: ' + options.style.background);
            styleSheet.addRule(DOM + ' .c3-chart-arcs-title', 'fill: ' + options.style.color);
            styleSheet.addRule(DOM + ' .c3-chart-arc', 'stroke: ' + options.style.background);
            styleSheet.addRule(DOM + ' .c3-chart-arcs-background', 'stroke: ' + options.style.background);
            break;
    }
}

function DyGraphs_ColorChange(options) {
    var DOM = '#' + options.id;
    var styleSheet = CreateStyleSheet();

    styleSheet.addRule(DOM + '', 'background-color: ' + options.style.background);
    styleSheet.addRule(DOM + ' .dygraph-axis-label', 'color: ' + options.style.color);
    styleSheet.addRule(DOM + ' .dygraph-legend', 'background: ' + options.style.background);
    styleSheet.addRule(DOM + ' .dygraph-legend', 'color: ' + options.style.color)
}