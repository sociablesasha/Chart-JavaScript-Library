# Reference

## Usage
```javascript
var data = new Object();
data.id = '';
data.url = '';
data.style = {
    'width': '',
    'height': '',
    'background': '',
    'color': ''               
};
data.type = '';
data.chart = {
    // Options
}
Analyser(data);
```

## Dygrphs
**Usage**
```javascript
data.type = 'Dygrphs';
```

**chart**
```javascript
data.chart = {
    'valueRange': [0.0, 1.0],
    'interval': 10000,
    'style': {
        'pattern': ['blue'],
        'width': '1'
    }
};
```

## C3
**Usage**
```javascript
data.type = 'C3';
```

**chart**
```javascript
// Line
data.chart = {
    'type': 'Line',
    'x': 'Date',
    'keys': ['Temperature'],
    'style': {
        'pattern': ['red'],
        'width': '5',
    }
};

// Pie
data.chart = {
    'type': 'Pie',
    'key': 'Date',
    'value': 'Temperature',
    'style': {
        'pattern': ['red'],
        'width': '50',
    }
};

// Donut
data.chart = {
    'type': 'Donut',
    'key': 'Date',
    'value': 'Temperature',
    'style': {
        'pattern': ['red'],
        'width': '10',
    }
}

// Gauge
data.chart = {
    'type': 'Gauge',
    'style': {
        'pattern': ['red', 'yellow', 'green'],
        'threshold': {
            'values': [30, 70, 100]
        },
        'width': '50'
    }
}
```