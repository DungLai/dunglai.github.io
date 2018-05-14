window.dataTable = function(id, data, columns, colors, callback_highlight){
	var dataTable = {};
	var _data = data;
	var columns2 = [
		{ name: "Make", field: "make", id: "make", sortable: true, width: 90, resizable: false , headerCssClass: "prKeyHeadColumn", formatter: MakeFormatter },
		{ name: "Fuel-type", field: "fuel-type", id: "fuel-type", sortable: true, width: 65, resizable: false , headerCssClass: "prKeyHeadColumn", formatter:FuelFormatter },
	    { name: "Compression", field: "compression", id: "compression", sortable: true, width: 95, resizable: false, headerCssClass: "prKeyHeadColumn", cssClass: "numericCell" },
	    { name: "City-Mpg (mi)", field: "city-mpg", id: "city-mpg", sortable: true, width: 90, resizable: false , headerCssClass: "prKeyHeadColumn", cssClass: "numericCell"},
	    { name: "Cylinders", field: "cylinders", id: "cylinders", sortable: true, width: 65, resizable: false , headerCssClass: "prKeyHeadColumn", cssClass: "numericCell"},
	    { name: "Weight (lbs)", field: "weight", id: "weight", sortable: true, width: 85, resizable: false, headerCssClass: "prKeyHeadColumn", cssClass: "numericCell", formatter: NumberFormatter },
	    { name: "Engine-size (cm3)", field: "engine-size", id: "engine-size", sortable: true, width: 115, resizable: false , headerCssClass: "prKeyHeadColumn", cssClass: "numericCell"},
	    { name: "Length (cm)", field: "length", id: "length", sortable: true, width: 80,resizable: false , headerCssClass: "prKeyHeadColumn", cssClass: "numericCell" },
	    { name: "Horsepower", field: "horsepower", id: "horsepower", sortable: true, width: 90, resizable: false , headerCssClass: "prKeyHeadColumn", cssClass: "numericCell"},
	    { name: "Width (cm)", field: "width", id: "width", sortable: true, width: 80, resizable: false  , headerCssClass: "prKeyHeadColumn", cssClass: "numericCell"},
	    { name: "Price ($)", field: "price", id: "price", sortable: true, width: 65, resizable: false , headerCssClass: "prKeyHeadColumn", cssClass: "numericCell", formatter: NumberFormatter}

	];

	var options = {
        enableCellNavigation: true,
        enableColumnReorder : true,
      };

	var grid = new Slick.Grid("#" + id, _data, columns2, options)

	grid.onSort.subscribe(function (e, args) {
    	var field = args.sortCol.field;
	    _data.sort(function (a, b) {
	        var result =
	            a[field] > b[field] ? 1 :
	            a[field] < b[field] ? -1 :
	            0;

	        return args.sortAsc ? result : -result;
	    });
    	grid.invalidate();
	});

	grid.onMouseEnter.subscribe(function(e,args) {
		var selected = grid.getCellFromEvent(e).row;
		callback_highlight(_data[selected]);
    });

	grid.onMouseLeave.subscribe(function(e,args) {
		callback_highlight(undefined);
    });

    function MakeFormatter(row, cell, value, columnDef, dataContext) {
        if (value == null || value == "" || typeof value == "undefined"){
            return "";
        }
        else {
			return  "<svg width=\"20\" height=\"20\"> <circle style=\"width:80%; height:80%;\" cy=\"12\" cx=\"10\" r=\"7\" fill=\"" + colors[value] + "\"> </circle> </svg> <text>" + capitalize(value) + " </text>";
        }
    }

    function FuelFormatter(row, cell, value, columnDef, dataContext) {
		return  "<text>" + capitalize(value) + " </text>";
    }

     function NumberFormatter(row, cell, value, columnDef, dataContext) {
        if (value == null || value == "" || typeof value == "undefined"){
            return "";
        }
        else {
        	var priceWithDots = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

			return  "<text>" + priceWithDots + "</text>";
        }
    }

	dataTable.update = function(data){
		if (_.isEmpty(data)) return;
		_data = data;
		grid.setData(_data);
		grid.invalidate();
		grid.render();
	}

    return dataTable;

}