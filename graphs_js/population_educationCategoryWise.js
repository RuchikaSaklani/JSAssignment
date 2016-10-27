//variables declaration
var width = 1500,
height = 700,
radius = Math.min(width, height) / 3;
var legendRectSize = 18;
var legendSpacing = 10;

var color = d3.scale.ordinal()
.range(["#006666", "#FF0033", "#FFFF00", "#FF99CC", "#D0743C", "#FF8C00", "666666", "pink", "green", ]);

var arc = d3.svg.arc()
.outerRadius(radius +100)
.innerRadius(radius - 100);

//set layout
var pie = d3.layout.pie()
.value(function(d) { return d.Population; });

var svg = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("transform", "translate(" + width / 4 + "," + height / 2 + ")");

//define the tooltip
 var tooltip = d3.select("body").append("div")
 .attr('class', 'tooltip');
 tooltip.append('div')
 .attr('class', 'label');
 tooltip.append('div')
 .attr('class', 'count');
 tooltip.append('div')
 .attr('class', 'percent');

//access the json file
d3.json("./../json/Education_categories_population.json",function(error, data) {
if (error) throw error;
data.forEach(function (d) {
d.Population =+d.Population;
return d;
});


var g = svg.selectAll(".arc")
  .data(pie(data))
  .enter().append("g")
  .attr("class", "arc");

g.append("path")
  .attr("d", arc)
  .style("fill", function(d) { return color(d.data.Education_category); });

  //add the tooltip
   g.on('mouseover', function(d) {
     var total = d3.sum( data.map(function(d) {
       return d["Population"];
     }));
     var percent = Math.round(1000 * d.data["Population"] / total) / 10;
     tooltip.select('.label').html(d.data.label);
     tooltip.select('.count').html(d.data["Population"]);
     tooltip.select('.percent').html(percent + '%');
     tooltip.style('display', 'block');
   });

   g.on('mouseout', function() {
     tooltip.style('display', 'none');
   });



//legend
var legend = svg.selectAll('.legend')
      .data(color.domain())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', function(d, i) {
        var height = legendRectSize + legendSpacing;
        var offset =  height * color.domain().length / 2;
        var horz = 20 * legendRectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
      });

    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', color)
      .style('stroke', color);
    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .style("font-size","17px")
      .text(function(d) { return d; });
});
