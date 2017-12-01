(function() {
	

	// initial configurations parameters
	var margin = {
		top: 20,
		right: 20,
		bottom: 30,
		left: 40
	};
	var width = 960 - margin.left - margin.right;
	var height = 500 - margin.top - margin.bottom;



	// create the svg element
	var svg = d3.select("body")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)

	// add <g> inside the <svg> that will contain every thing else
	// translate it from the left and top margin
	.append("g")
		.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


	// get the data
	// It will be in csv
	// so we will use d3.csvParse to parse it to JSON
	var data;

	// load the data
	$.ajax({
		url: 'data.csv',
		dataType: 'text',
		success: function(response) {
			// parse the received csv to json
			data = d3.csvParse(response);
		},
		async: false
	});


	// get age names from the keys of the first object of data
	var ageNames = d3.keys(data[0]).filter(function(key) {return key != "State";});


	// create an array under each object in data array that will contains the ages names and values
	// of that specific State
	data.forEach(function(d) {
    	d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
  	});

	// get the max age of all States
	var maxAge = d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; });}); 

	
	
	// create scale for the x-axis
	// the range will be the width of our svg
	// the domain will be the names of states
	var x0 = d3.scaleBand()
		.range([0, width])
		.domain(data.map(function(d) {return d.State;}))
		.round(true);

	// create the actual x-axis
	var xAxis = d3.axisBottom(x0);

	// add it to svg
	svg.append('g')
		.attr('class', "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);	
	

	// create scale for the y-axis
	// the range will be the height of our svg (but reversed)
	// the domain will be from 0  to the maximum ages of all states
	var y = d3.scaleLinear()
		.range([height, 0])
		.domain([0, maxAge]);


	// create the actual y-axis
	var yAxis = d3.axisLeft(y)
		.tickFormat(d3.format(".2s"));

	// add it to svg
	var yAxisG = svg.append('g')
		.attr("class", "y axis")
		.call(yAxis);

	// TODO: fix the text problem.
	// add an indicative text
	yAxisG.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Population");


	// create an ordinal scale of colors
	var color = d3.scaleOrdinal()
		.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

	var x1 = d3.scaleBand()
		.range([5, x0.bandwidth() - 15])
		.domain(ageNames)
		.paddingInner(0)
		.paddingOuter(0)
		.round(true);


	// create <g> for each state
	// each state will be translated to the right
	// using the scaleBand x0
	var state = svg.selectAll(".state")
      .data(data)
    .enter().append("g")
      .attr("class", "state")
      .attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; });

    state.selectAll("rect")
      .data(function(d) { return d.ages; })
    .enter().append("rect")
      .attr("width", (x0.bandwidth() / ageNames.length) - 3)
      .attr("x", function(d) { return x1(d.name);})
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .style("fill", function(d) { return color(d.name); });


    var legend = svg.selectAll(".legend")
      .data(ageNames.slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; }); 




})();