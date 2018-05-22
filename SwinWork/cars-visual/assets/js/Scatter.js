self._var1 = "length";
self._var2 = "width";

//dropdown menu for scatter plot
function on_change_var1(string) {
  self._var1 = string;

  //https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript
  var e = document.getElementById("var2");
  self._var2 = e.options[e.selectedIndex].value;

  document.getElementById("scatter").innerHTML = '';
  // console.log("change var 1");
  // console.log("var 1: " + self._var1);
  // console.log("var 2: " + self._var2);
  // self._pcp = parallelCoordinatesChart("pcp", self._data, self._colors, dimensions, self.callback_applyBrushFilter);
  self._scatter = scatter("scatter", self._data_selected, self._var1, self._var2, self._pcp.highlight_single);
        // self._dataTable = dataTable("data-table", self._data_selected, dimensions, self._colors, self._pcp.highlight_single)

}

//check box for pcp
function on_change_var2(string) {
  self._var2 = string;
  var e = document.getElementById("var1");
  self._var1 = e.options[e.selectedIndex].value;

  document.getElementById("scatter").innerHTML = '';
  // console.log("change var 2");
  // console.log("var 1: " + self._var1);
  // console.log("var 2: " + self._var2);
  self._scatter = scatter("scatter", self._data_selected,self._var1, self._var2, self._pcp.highlight_single);
}

window.scatter = function(id, data, var1, var2, callback_highlight) {

  // delete old graph and load new graph

  document.getElementById("scatter").innerHTML = '';

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 490 ;
      height = 460 ;
      // width = 100 ;
      // height = 200 ;


  /* 
   * value accessor - returns the value to encode for a given data object.
   * scale - maps value to a visual display encoding, such as a pixel position.
   * map function - maps from data value to display value
   * axis - sets up axis
   */ 
  // http://bl.ocks.org/weiglemc/6185069
  // setup x 
  var xValue = function(d) { return d.Calories;}, // data -> value
  // var xValue = function(d) { return d[var1];}, // data -> value
      xScale = d3.scale.linear().range([0, width]), // value -> display
      xMap = function(d) { return xScale(xValue(d));}, // data -> display
      xAxis = d3.svg.axis().scale(xScale).orient("bottom");
  // setup y
  var yValue = function(d) { return d["Protein (g)"];}, // data -> value
  // var yValue = function(d) { return d[var2];}, // data -> value
      yScale = d3.scale.linear().range([height, 0]), // value -> display
      yMap = function(d) { return yScale(yValue(d));}, // data -> display
      yAxis = d3.svg.axis().scale(yScale).orient("left");

  // setup fill color
  // var cValue = function(d) { return d.Manufacturer;},
  var cValue = function(d) { return d.make;},
      // color = d3.scale.category10();
      color = d3.scale.category20();
      // console.log(color);
      colors = {
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


  // document.getElementById('scatter').innerHTML = "testtesttest";

  // add the graph canvas to the body of the webpage
  var svg = d3.select("#" + id).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // add the tooltip area to the webpage
  var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  // load test dataset
  // d3.csv("cereal.csv", function(error, data) {
  // d3.csv("./data/imports-85.csv", function(error, data) {

    // change string (from CSV) into number format
    data.forEach(function(d) {
      d.Calories = +d[var1];
      d["Protein (g)"] = +d[var2];
    });

    // setup fixed max min 
      // don't want dots overlapping axis, so add in buffer to data domain
      xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
      yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

    // x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text(var1);

    // y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(var2);

    // draw dots
    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5)
        .attr("cx", xMap)
        .attr("cy", yMap)
        // .style("fill", function(d) { return color(cValue(d));}) 
        .style("fill", function(d) { return colors[d.make];}) 

        //highlight data
        .on('mouseover', function(d, i) {
          callback_highlight(data[i]);
          // tip.transition().duration(0);
        })
        .on('mouseout', function(d, i) {
          callback_highlight(undefined);

          // tip.style('display', 'none');
        });

    // draw legend
    var legend = svg.selectAll(".legend")
        .data(color.domain())
        // .data(color[d.make])
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // draw legend colored rectangles
    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        // .style("fill", color[d.make]);

    // draw legend text
    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d;})
  }
  // )
;
// }