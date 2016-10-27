// set the dimensions of the canvas
var margin = {top: 40, right: 80, bottom: 80, left: 300},
  width = 1300 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")


var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(10);


// add the SVG element
var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


// load the data
d3.json("./../json/ageWiseLiterate.json", function(error, data) {

  data.forEach(function(d) {

      d["Age"] = d["Age"];
      d["Literate_population"] = +d["Literate_population"];
  });

  //sort the data
  data.sort(function(a,b){
    return b["Literate_population"]-a["Literate_population"];
  });

// scale the range of the data
x.domain(data.map(function(d) { return d["Age"]; }));
y.domain([0, d3.max(data, function(d) { return d["Literate_population"]; })]);

// add axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(-90)" );

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -120)
    .attr("x", -160)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Literate_population");


// Add bar chart
svg.selectAll("bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d["Age"]); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d["Literate_population"]); })
    .attr("height", function(d) { return height - y(d["Literate_population"]); });

});
