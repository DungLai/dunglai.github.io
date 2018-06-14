window.donutChartTotals = function(id, data, colors) {
    var donutChartTotals = {};
    
    // Set vars
    var width = 100,
        height = 100,
        donutWidth = 25,
        radius = Math.min(width, height) / 2.5,
        donut = d3.layout.pie().sort(null).value(function(d) { return d.counts; }),
        arc = d3.svg.arc().innerRadius(radius - donutWidth).outerRadius(radius);
    
    // Create SVG object
    var svg = d3.select('#' + id)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .attr('display', 'horizontal-align')
                .attr('margin', 'auto')
                .append('g')
                .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

    // Create pie object with data counts
    var path = svg.selectAll("path")
			    .data(donut(count(data)))
                .enter().append("path")        
                .attr('fill', function(d, i) { 
                    return colors[d.data.label]; 
                })
                .attr("d", arc);
    
      
    donutChartTotals.update = function(data){
        if (_.isEmpty(data)) return;
        path = path.data(donut(count(data))); // compute the new angles
        path.transition().duration(250).attr("d", arc);// redraw the arcs
    };
    
    function count(data) {
        var counts = [];
        counts.push( { label: "selected", counts: data.length })
        counts.push( { label: "un-selected", counts: 205 - data.length })

        return counts;
    };
    
    
    // Show tooltip on mouse over      
    // Set up the tooltip object
    var tooltip = d3.select('#' + id)                               
                    .append('div')                                                
                    .attr('class', 'tooltip')
                    .style("opacity", 0)
                    .style("display", "block");
    // Label, Count And Percentage
    tooltip.append('div').attr('class', 'tooltip_label');                                      
    tooltip.append('div').attr('class', 'tooltip_count');                                      
    tooltip.append('div').attr('class', 'tooltip_percent');   
    
    path.on("mouseover", function(d) {
        // Create ARC Over object for pie chart animation
        var arcOver = d3.svg.arc()
                    .innerRadius(radius - donutWidth + 5)
                    .outerRadius(radius + 5);
        // Calculate total
        var total = 0
        d3.sum(data.map(function(d) {
            ++total;
        }));   
        
        // Calculate percentage
        var percent = Math.round(1000 * d.data.counts / total) / 10;
        
        // Set tooltip values (label, count, percentage)
        tooltip.select('.tooltip_label').html("Group: " + capitalize(d.data.label));                
        tooltip.select('.tooltip_count').html("Counts: " + d.data.counts);             
        tooltip.select('.tooltip_percent').html("Over total: " + percent + '%'); 
        tooltip.transition().duration(200).style("opacity", 0.9); 
                    
        // Set animation
        d3.select(this).transition()
                        .duration(500)
                        .attr("d", arcOver);
    });
    
    // Remove tooltip on mouse out
    path.on("mouseout", function(d) {
        tooltip.transition().duration(500).style("opacity", 0);  
        
        // Set animation
        d3.select(this).transition()
                        .duration(1000)
                        .attr("d", arc);
    });
    
    // TODO Move tooltip as we move the mouse. It doesnt work using d3.event.page or d3.mouse(this)[0]. Why?
    /*
    path.on('mousemove', function(d,e) {      
        tooltip.style('top', (d3.event.pageY -50) + "px")       
               .style('left', (d3.event.pageX ) + "px");   
    });
    */    
    return donutChartTotals;
}