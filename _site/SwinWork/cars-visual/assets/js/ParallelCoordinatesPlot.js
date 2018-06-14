window.parallelCoordinatesChart = function(id, data, colors, dimensions, brush_callback){
    var original_data = data;
    var parallelCoordinatesChart = {};
    
    var margin = {top: 50, right: 10, bottom: 10, left: 60},
        // width = 950 - margin.left - margin.right,
        // height = 500 - margin.top - margin.bottom;
        // width = 800 - margin.left - margin.right,
        // height = 500 - margin.top - margin.bottom;
        width = 800 
        height = 500 - margin.top
    var x = d3.scale.ordinal().rangePoints([0, width], 1),
        y = {},
        dragging = {},
        highlighted = null;

    var line = d3.svg.line().interpolate('cardinal').tension(0.95),
        axis = d3.svg.axis().orient("left"),
        background,
        foreground;

    //delete old chart to load a new chart with new variables
    document.getElementById(id).innerHTML = '';

    var svg = d3.select("#" + id).append("svg")
                .attr("width", width + margin.left + margin.right)
                //.attr("width", "100%")
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    dimensions.forEach(function(attr) {
        if (attr === "fuel-type" || attr ==='make' || attr === 'fuel-system' || attr === 'aspiration' || attr === 'symboling' || attr === 'num-of-doors' || attr === 'body-style' || attr === 'drive-wheels' || attr === 'engine-location' || attr === 'engine-type'){
          var domain = [];
          data.forEach(function(row){
            var index = domain.indexOf(row[attr]);
            if (index === -1){ // Does not exists
              domain.push(row[attr]);
            }
          })
          y[attr] = d3.scale.ordinal()
                          .domain(domain)
                          .rangePoints([height, 0], 1);
        }else {
          y[attr] = d3.scale.linear()
                          .domain(d3.extent(data, function(row) { return +row[attr]; }))
                          .range([height, 0]);
        }
    });
    x.domain(dimensions);

    // Add grey background lines for context.
    background = svg.append("g")
        .attr("class", "background")
        .selectAll("path")
        .data(data)
        .enter().append("path")
        .attr("d", path);

    // Add colored foreground lines for focus.
    foreground = svg.append("g")
        .attr("class", "foreground")
        .selectAll("path")
        .data(data)
        .enter().append("path")
        .attr("d", path)
        // Set each line color according to  make attr
        .attr("style", function(d) {
            return "stroke:" + colors[d.make] + ";";
        });
        
    // Add a group element for each dimension.
    var g = svg.selectAll(".dimension")
        .data(dimensions)
        .enter().append("g")
        .attr("class", "dimension")
        .attr("width", 250)
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
        .call(d3.behavior.drag()
            .on("dragstart", function(d) {
              dragging[d] = this.__origin__ = x(d);
              background.attr("visibility", "hidden");
            })
            .on("drag", function(d) {
              dragging[d] = Math.min(width, Math.max(0, this.__origin__ += d3.event.dx));
              foreground.attr("d", path);
              dimensions.sort(function(a, b) { return position(a) - position(b); });
              x.domain(dimensions);
              g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
            })
            .on("dragend", function(d) {
              delete this.__origin__;
              delete dragging[d];
              d3.select(this).attr("transform", "translate(" + x(d) + ")").transition().duration(500);
              
              foreground.transition().duration(500).attr("d", path);
              background
                  .attr("d", path)
                  .transition()
                  .delay(500)
                  .duration(0)
                  .attr("visibility", null);
            }));

    // Add an axis and title.
    g.append("g")
        .attr("class", "axis")
        .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
        .append("text")
        .style("text-anchor", "middle")
        .attr("y", -9)
        .text(function(d) { return capitalize(d); });
        
    // Add and store a brush for each axis.
    g.append("svg:g")
        .attr("class", "brush")
        .each(function(d) { d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brush", brush)); })
    .selectAll("rect")
        .attr("x", -12)
        .attr("width", 24);

    function position(d) {
        var v = dragging[d];
        return v == null ? x(d) : v;
    }
    // Returns the path for a given data point.
    function path(d) {
        return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
    }
    
    // Handles a brush event, toggling the display of foreground lines.
    function brush() {
        var actives_extents = [];
        for (var i in dimensions){
            var dimension = dimensions[i];
            
            if (!y[dimension].brush.empty()) {
                var active_extent = {
                    'variable': dimension,
                    'lower_bound': y[dimension].brush.extent()[0],
                    'upper_bound': y[dimension].brush.extent()[1]
                };
                actives_extents.push(active_extent);
            }
        }
        
        var brushed_data = original_data.slice();
        foreground.style("display", function(d) {
            return actives_extents.every(function(p, i) {
                var p_new = (y[p.variable].ticks)?d[p.variable]:y[p.variable](d[p.variable]); //convert to pixel range if ordinal
                if (p.lower_bound <= p_new && p_new <= p.upper_bound){
                    return true;
                }else {
                    brushed_data.splice(brushed_data.indexOf(d),1);
                    return false;
                }
            }) ? null : "none";
        });
        brush_callback(brushed_data)


        // update data
        self._scatter = scatter("scatter", self._data_selected, "width", "length");

    }
    
    parallelCoordinatesChart.update = function(dataset) {
        data = dataset;
    }

    parallelCoordinatesChart.highlight_group = function(make) {
        if (typeof make == "undefined") {
          d3.select("#pcp .foreground").style("opacity", function(d, j) {
            return "1";
          });
          highlighted.remove();
        } else {
          d3.select("#pcp .foreground").style("opacity", function(d, j) {
            return "0.45";
          });
          if (highlighted != null) {
            highlighted.remove();
          }
          var highlighted_data = data.filter(function(o){
            if (o.make != make){
                return false;
            }else {
                return true;
            }
          });

          highlighted = svg.append("svg:g")
                           .attr("class", "highlight")
                         .selectAll("path")
                           .data(highlighted_data)
                         .enter().append("svg:path")
                           .attr("d", path)
                           .attr("style", function(d) {
                             return "stroke:" + colors[d.make] + ";";
                           });
        }
    }

    parallelCoordinatesChart.highlight_single = function(data_row) {

        if (typeof data_row == "undefined") {
          d3.select("#pcp .foreground").style("opacity", function(d, j) {
            return "1";
          });
          highlighted.remove();
        } else {
          d3.select("#pcp .foreground").style("opacity", function(d, j) {
            return "0.45";
          });
          if (highlighted != null) {
            highlighted.remove();
          }

          highlighted = svg.append("svg:g")
                           .attr("class", "highlight")
                         .selectAll("path")
                           .data([data_row])
                         .enter().append("svg:path")
                           .attr("d", path)
                           .attr("style", function(d) {
                             return "stroke:" + colors[d.make] + ";";
                           });
        }
    }
    return parallelCoordinatesChart;
}