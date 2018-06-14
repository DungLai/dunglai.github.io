window.legendChart = function (id, data, colors, callback) {
    var legendChart = {};
    
    var width = 850,
        height = 90,
        legendRectSize = 18,
        legendSpacing = 4,
        columnsDistance = 90;

    var svg = d3.select('#' + id )
                .append('svg')
                .attr('width', width)
                .attr('height', height);
            
    var legend = svg.selectAll('.legend')
                    .data(count(data,"make"))
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', function(d, i) {
                        d3.select(this).attr('id', d);
                        var height = legendRectSize + legendSpacing;
                        var horz = Math.floor(i/3) * (legendRectSize + columnsDistance)
                        var vert = i%3 * (height);
                        return 'translate(' + horz + ',' + vert + ')';
                    });
    
    // Create rectangles with colors                
    legend.append('circle')
        .attr("cy", 10)
        .attr("cx", 10)
        .attr("r", 7)
        .attr('fill', function(d, i) { 
            return colors[d.label];
        });
        
    // Create text
    legend.append('text')
        .attr('class', "legend_text")
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) { 
            return d.label; 
        });
    
    legend.on("click", function(d){            
        if (callback(d)){
            d3.select(this).style("opacity",0.2);
        }else {
            d3.select(this).style("opacity",1);
        }
    })

    function count(data, groupBy) {
      var counts = {};
      var keys = [];
      _(data)
        .chain()
        .groupBy(groupBy)
        .each(function(v,k) {
          keys[keys.length] = k;
          counts[k] = v.length;
        });

        return _(keys).map(function(k) {
            if (k in counts) {
              return {label: k, counts: counts[k]}
            } else {
              return 0;
            }
      });
    };
    
    return legendChart;
}