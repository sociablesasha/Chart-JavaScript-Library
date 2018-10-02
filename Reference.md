# Reference

## Usage
```javascript
var data = new Object();
data.id = '';
data.url = '';
data.style = {
    'width': '',
    'height': ''                
};
data.type = '';
data.chart = {
    // Options
}
Analyser(data);
```

## D3
**Usage**
```javascript
var data = new Object();
/**
 *
**/
data.type = 'D3';
Analyser(data);
```

**id**
```javascript
data.id = 'DOM ID';
```

**width**
```javascript
data.style = {
    'width': '900',
};
```

**height**
```javascript
data.style = {
    'height': '900',
};
```

**background**
```javascript
data.style = {
    'background': 'black',
};
```

**color**
```javascript
data.style = {
    'color': 'white',
};
```

**chart**
```javascript
data.chart = {
    'valueRange': [0.0, 1.0],
    'interval': 10000,
    'style': {
        'pattern': ['blue'],
        'stroke': {
            'width': '1',
        }
    }
};
```

## C3
**Usage**
```javascript
var data = new Object();
/**
 *
**/
data.type = 'C3';
Analyser(data);
```

**id**
```javascript
data.id = 'DOM ID';
```

**width**
```javascript
data.style = {
    'width': '900',
};
```

**height**
```javascript
data.style = {
    'height': '900',
};
```

**background**
```javascript
data.style = {
    'background': 'black',
};
```

**color**
```javascript
data.style = {
    'color': 'white',
};
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
        'stroke': {
            'width': '5',
        }
    }
};

// Pie
data.chart = {
    'type': 'Pie',
    'key': 'Date',
    'value': 'Temperature',
    'style': {
        'pattern': ['red']
    }
};
```