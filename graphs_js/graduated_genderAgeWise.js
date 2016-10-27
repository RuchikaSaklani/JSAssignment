//variables used
  var margin={top:20, bottom:165, left:150, right:50},
  width=1300-margin.left-margin.right,
  height=600-margin.top-margin.bottom;
  var horizontal=d3.scale.ordinal().rangeRoundBands([0,width],0.25),
  vertical=d3.scale.linear().rangeRound([height,0]);
  var color = d3.scale.category20();
  //Define the axes
  var xAxis=d3.svg.axis()
  .scale(horizontal)
  .orient("bottom");
  var yAxis=d3.svg.axis()
  .scale(vertical)
  .orient("left");
  var svg=d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");
  d3.json("../json/graduated.json", function(err,data){
    data.forEach(function(d){
      d["State"]=d["State"];
      d["Graduate-Males"]=+d["Graduate-Males"];
      d["Graduate-Females"]=+d["Graduate-Females"];
    });
    //sort the data
    data.sort(function(a,b)
    {
      return ((b["Graduate-Males"]+b["Graduate-Females"])-(a["Graduate-Males"]+a["Graduate-Females"]));
    });
    var xData=["Graduate-Males","Graduate-Females"];
    var dataIntermediate = xData.map(function (c) {
      return data.map(function (d) {
        return {x: d["State"], y: d[c]};
      });
    });
    //Adding y0 attribute
    var dataStackLayout = d3.layout.stack()(dataIntermediate);
    horizontal.domain(dataStackLayout[0].map(function (d) {
      return d.x;
    }));
    vertical.domain([0,
      d3.max(dataStackLayout[dataStackLayout.length - 1],
        function (d) { return d.y0 + d.y;})
      ]);
      var layer = svg.selectAll(".stack")
      .data(dataStackLayout)
      .enter().append("g")
      .attr("class", "stack")
      .style("fill", function (d, i) {
        return color(i);
      });
      layer.selectAll("rect")
      .data(function (d) {
        return d ;
      })
      .enter().append("rect")
      .attr("x", function (d) {
        return horizontal(d.x);
      })
      .attr("y", function (d) {
        return vertical(d.y + d.y0);
      })
      .attr("height", function (d) {
        return vertical(d.y0) - vertical(d.y + d.y0);
      })
      .attr("width", horizontal.rangeBand());
      svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height)+ ")")
      .call(xAxis)
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("transform", "rotate(60)")
      .style("font-size", "11px")
      .style("text-anchor", "start");
      svg.append("text")
      .attr("transform", "translate(0," + (height+110) + ")")
      .attr("x", width/2)
      .attr("y", margin.top)
      .style("text-anchor", "middle")
      .style("fill","orange")
      .style("font-size","35px")
      .style("font-family","Comic")
      .text("All States");
      svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
      svg.append("text")
      .attr("fill", "orange")
      .attr("transform", "rotate(-90)")
      .attr("x", 0-(height/2))
      .attr("y", 0-(margin.left/2)-20)
      .style("text-anchor", "middle")
      .style("font-size","35px")
      .style("font-family","Comic")
      .text("Graduate-Population");
      var rect = svg.selectAll(".rect")
      .data(color.domain().slice())
      .enter().append("g")
      .attr("class", "rect")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 +
      ")"; });
      rect.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);
      rect.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .style("fill","black")
      .style("font-size","15px")
      .text(function(d,i) { return xData[i]; });
    });
