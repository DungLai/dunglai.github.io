
// check if element  existed in the array\
// https://stackoverflow.com/questions/1181575/determine-whether-an-array-contains-a-value
var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

// add attribute to dimensions list if they havent already exist
function on_select_attr(string) {
    // add to array if not exist
    if (!contains.call(self._dimensions_selected, string)) {
        self._dimensions_selected.push(string);
    } else {
        // remove from array
        for(var i = self._dimensions_selected.length - 1; i >= 0; i--) {
            if(self._dimensions_selected[i] === string) {
               self._dimensions_selected.splice(i, 1);
            }
        }
    }
    
    self._pcp = parallelCoordinatesChart("pcp", self._data, self._colors, self._dimensions_selected, self.callback_applyBrushFilter);
        
    // console.log(self._dimensions_selected);
}

function Main(){
    // reset page, uncheck everything
    $('input:checkbox').removeAttr('checked');

    self._dimensions_selected = ['make', 'fuel-type', 'compression-ratio', 'city-mpg', 'num-of-cylinders', 'curb-weight', 'engine-size', 'length', 'horsepower', 'width', 'price'];

    // tick checkbox for default dimension
    for (var i = 0; i < self._dimensions_selected.length; i++) {
        $('#' + self._dimensions_selected[i]).prop('checked', true);
    }

    self = this;

    // Data
    self._data = []
    self._data_selected = []
    
    
    // Charts
    self._pcp = null;
    self._donutMakes = null;
    self._donutTotals = null;
    self._legend = null;
    self._dataTable = null;
    self._stats = null;

    // Other
    self._colors = {
        "selected": "#97a4bc",
        "un-selected":  "#e8eefd",
        "alfa-romero" : '#0a72ff',
        "audi" : '#1eff06',
        "bmw" : '#ff1902',
        "chevrolet" : '#2dfefe',
        "dodge" : '#827c01',
        "honda" : '#fe07a6',
        "isuzu" : '#a8879f',
        "jaguar" : '#fcff04',
        "mazda" : '#c602fe',
        "mercedes-benz" : '#16be61',
        "mercury" : '#ff9569',
        "mitsubishi" : '#05b3ff',
        "nissan" : '#8ffec2',
        "peugot" : '#3f8670',
        "plymouth" : '#e992ff',
        "porsche" : '#ffb209',
        "renault" : '#e72955',
        "saab" : '#83bf02',
        "subaru" : '#bba67b',
        "toyota" : '#fe7eb1',
        "volkswagen" : '#7570c1',
        "volvo" : "#85bfd1"
    }

    // self._dimensions_selected = ['make', 'fuel-type', 'length', 'width'];
    self._dimensions_selected = ['make', 'fuel-type', 'compression-ratio', 'city-mpg', 'num-of-cylinders', 'curb-weight', 'engine-size', 'length', 'horsepower', 'width', 'price'];

    // scatter plot
    self._var1 = "";
    self._var2 = ""; 

    self.init();
}

Main.prototype = {
    init : function(csvFile){
        console.debug("Main: init");
        d3.csv("./data/imports-85.csv", function(d) {
        return {
            //get a full collumn of data
            'make': d['make'],
            'fuel-type' : d['fuel-type'],
            // plus sign : read metric data
            'length' : +d['length'],
            'width' :+d['width'],
            'curb-weight': +d['curb-weight'],
            'num-of-cylinders' : +d['num-of-cylinders'],
            'engine-size' : +d['engine-size'],
            'fuel-system': d['fuel-system'],
            'compression-ratio' : +d['compression-ratio'],
            'horsepower' : +d['horsepower'],
            'city-mpg' : +d['city-mpg'],
            'price' : +d['price'],
            // improvement, add extra dimensions
            'symboling': d['symboling'],
            'normalized-losses': +d['normalized-losses'],
            'aspiration': d['aspiration'],
            'num-of-doors': d['num-of-doors'],
            'body-style': d['body-style'],
            'drive-wheels': d['drive-wheels'],
            'engine-location': d['engine-location'],
            'wheel-base': +d['wheel-base'],
            'engine-type': d['engine-type'],
            'bore': +d['bore'],
            'stroke': +d['stroke'],
            'peak-rpm': +d['peak-rpm'],
            'highway-mpg': +d['highway-mpg'],
        };
        }, function(data) {
            self._data = data;
            self._data_selected = self._data.slice();
            self.setupCharts();
        });    
        
    },

    setupCharts : function(){
        var dimensions = ['make', 'fuel-type', 'compression-ratio', 'city-mpg' , 'num-of-cylinders', 'curb-weight', 'engine-size','length', 'horsepower','width', 'price'];
        self._stats = stats(self._data);
        self._pcp = parallelCoordinatesChart("pcp", self._data, self._colors, dimensions, self.callback_applyBrushFilter);
        self._legend = legendChart("legend", self._data_selected, self._colors, self.callback_applyGroupFilter)
        self._donutMakes = donutChartGrouped("pie-groups", self._data_selected, "make",  self._colors, self._pcp.highlight_group);
        self._donutTotals = donutChartTotals("pie-totals", self._data_selected, self._colors);
        self._dataTable = dataTable("data-table", self._data_selected, dimensions, self._colors, self._pcp.highlight_single)
        self._scatter = scatter("scatter", self._data_selected, "width", "length");
    },
    
    callback_applyBrushFilter : function(brushed_data){
        self._data_selected = brushed_data;
        self._scatter = scatter("scatter", self._data_selected, "width", "length");

        self.refreshCharts();
    },

    refreshCharts : function() {
        self._donutTotals.update(self._data_selected);
        self._donutMakes.update(self._data_selected);
        self._pcp.update(self._data_selected);
        self._dataTable.update(self._data_selected);
        self._scatter = scatter("scatter", self._data_selected, "width", "length");
        
    },
    

    callback_applyGroupFilter : function(groupFilter){
        var hide = false;
        var index = self._data_visible_groups.indexOf(groupFilter);
        if (index == -1){   // Index does not exist
            hide = false;
            // Add group as a visible group
            self._data_visible_groups.push(groupFilter);
        }else { // Index does exist    
            hide = true;
            // Remove group as visible
            self._data_visible_groups.splice(index,1);
        }
        self.refreshCharts();
        return hide;
    },
} 

function capitalize(string) { 
    return string.charAt(0).toUpperCase() + string.slice(1); 
}