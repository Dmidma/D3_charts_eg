(function() {
	


	function parseData(dataPath, dataType, dataParser) {
		var data;

		$.ajax({
			url: dataPath,
			dataType: 'text',
			success: function(response) {
				if (dataType == 'csv') {
					data = d3.csvParse(response);
				} 
				else if (dataType == 'tsv') {
					data = d3.tsvParse(response);
				}
				else if (dataType == 'dsv') {
					if (dataParser === undefined) {
						throw "Must specify dataParser when using dsv dataType.";
						exit;
					}
					var psv = d3.dsvFormat(dataParser);
					data = psv.parse(response);
				}
				else {
					data = "Check the dataType";
				}
			},
			error: function(xhr, status, error) {
				console.log(xhr);
				console.log(status);
				console.log(error);
			},
			async: false
		});

		return data;
	}


	


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


	// get the data and parse it into JS object through the helper
	// parse function
	var data = parseData("./data.tsv", "tsv");




	// define a date format
	var formatDate = d3.timeParse("%d-%b-%y");


	data.map(function(d) {
		d.date = formatDate(d.date);
		d.close = +d.close;

		return d;
	});





	// define a time scale for the x-axis
	var x = d3.scaleTime()
		.range([0, width])
		.domain(d3.extent(data, function(d) { return d.date;}));


	// define linear scale for the y-axis
	var y = d3.scaleLinear()
		.range([height, 0])
		.domain(d3.extent(data, function(d) { return d.close;}));


	// define the x-axis
	var xAxis = d3.axisBottom(x);

	// add the x-axis
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	// define the y-axis
	var yAxis = d3.axisLeft(y);

	// add the y-axis
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);

	
	svg.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Price ($)");

	
	// create the line
	var line = d3.line()
		.x(function(d) { return x(d.date);})
		.y(function(d) { return y(d.close);});



	// add the line to svg
	svg.append("path")
		.datum(data)
		.attr("class", "line")
		.attr("d", line);
	


})();