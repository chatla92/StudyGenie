if (document.getElementById('fl')) {
var graph = {
        "nodes": [
          {
            "id": "Java",
            "chapters": [
              "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8"
            ],
            "name": "Java"
          },
        {
            "id": "Hibernate",
            "chapters": [
              "1",
          "2"
            ],
            "name": "Hibernate"
          },
          {
            "id": "JavaScript",
            "chapters": [
              "1",
              "3",
          "4",
          "6"
            ],
            "name": "JavaScript"
          },
          {
            "id": "SQL",
            "chapters": [
              "2",
          "3",
          "5",
          "8"
            ],
            "name": "SQL"
          },
          {
            "id": "ASP",
            "chapters": [
              "1",
          "3",
          "5",
          "7"
            ],
            "name": "ASP"
          },
          {
            "id": "HTML",
            "chapters": [
              "2",
          "4"
            ],
            "name": "HTML"
          },
        {
            "id": "React",
            "chapters": [
              "2",
          "3",
          "4",
          "6",
          "8"
            ],
            "name": "React"
          },
        {
            "id": "CSS",
            "chapters": [
              "1",
          "4",
          "6"
            ],
            "name": "CSS"
          },
          
          {
            "id": "MongoDB",
            "chapters": [
              "1",
          "3",
          "5",
          "7"
            ],
            "name": "MongoDB"
          },
          {
            "id": "Python",
            "chapters": [
              "2",
          "4",
          "1",
          "3",
          "5"
            ],
            "name": "Python"
          }
        ],
        "links": [
          {
            "source": "Java",
            "target": "JavaScript",
            "chapters": [
              "1",
          "3"
          
            ]
          },
          {
            "source": "Java",
            "target": "SQL",
            "chapters": [
              "2",
          "3",
          "5"
            ]
          },
          {
            "source": "Java",
            "target": "HTML",
            "chapters": [
              "2",
              "4"
            ]
          },
          {
            "source": "JavaScript",
            "target": "CSS",
            "chapters": [
              "1",
          "4",
          "6"
            ]
          },
          {
            "source": "JavaScript",
            "target": "React",
            "chapters": [
              "4",
          "3",
          "6"
            ]
          },
          {
            "source": "React",
            "target": "MongoDB",
            "chapters": [
              "3"
            ]
          },
        {
            "source": "MongoDB",
            "target": "Python",
            "chapters": [
              "1",
              "3",
          "5"
            ]
          },
          {
            "source": "Java",
            "target": "Python",
            "chapters": [
              "1",
          "2",
          "3",
          "4",
          "5",
          "6"
            ]
          },
          {
            "source": "MongoDB",
            "target": "SQL",
            "chapters": [
              "5",
          "3"
            ]
          },
        {
            "source": "Java",
            "target": "Hibernate",
            "chapters": [
              "1",
          "2"
            ]
          },
        {
            "source": "JavaScript",
            "target": "HTML",
            "chapters": [
              "1",
          "2"
            ]
          },
        {
            "source": "ASP",
            "target": "SQL",
            "chapters": [
              "5",
          "3"
            ]
          }
        ]
      }
        
        
      
      
      var width = 960;
      var height = 600;
      var nodeRadius = d3.scaleSqrt().range([4, 10]);
      var linkWidth = d3.scaleLinear().range([1, 2 * nodeRadius.range()[0]])
      var padding = nodeRadius.range()[1] + 2;
      var radius = Math.min(width - padding, height - padding)/2;
      
      var drag = d3.drag()
        .on('start', dragStart)
        .on('drag', dragging)
        .on('end', dragEnd);
      
      var svg = d3.select('svg')
        .attr('width', width)
        .attr('height', height);
      
      var forceSim = d3.forceSimulation()
        .force('link', d3.forceLink().id(function(d) { return d.id; }))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width/2, height/2));
      
      
      // Make sure small nodes are drawn on top of larger nodes
      graph.nodes.sort(function (a, b) { return b.chapters.length - a.chapters.length; });
      
      nodeRadius.domain([graph.nodes[graph.nodes.length-1].chapters.length, graph.nodes[0].chapters.length]);
      
      linkWidth.domain(d3.extent(graph.links, function (d) { return d.chapters.length; }));
      
      var link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(graph.links)
        .enter().append('line')
        .attr('stroke-width', function (d) { return linkWidth(d.chapters.length); });
      
      var node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(graph.nodes)
        .enter().append('circle')
        .attr('r', function (d) { return nodeRadius(d.chapters.length); })
        .call(drag);
      
      node.append('title').text(function (d) { console.log(d.name); return d.name; });
      
      forceSim.nodes(graph.nodes)
        .on('tick', tick);
      
      forceSim.force('link')
        .links(graph.links)
      
      function tick () {
        link
          .attr('x1', function (d) { return d.source.x; })
          .attr('x2', function (d) { return d.target.x; })
          .attr('y1', function (d) { return d.source.y; })
          .attr('y2', function (d) { return d.target.y; });
      
        node
          .attr('cx', function (d) {
            var dist = Math.sqrt((d.x - width/2) * (d.x - width/2) + (d.y - height/2) * (d.y - height/2));
            if (dist > radius)
              d.x = width/2 + (d.x - width/2) * radius/dist;
            return d.x;
          })
          .attr('cy', function (d) {
            var dist = Math.sqrt((d.x - width/2) * (d.x - width/2) + (d.y - height/2) * (d.y - height/2));
            if (dist > radius)
              d.y = height/2 + (d.y - height/2) * radius/dist;
            return d.y;
          });
      }
      
      
      function dragStart (d) {
        if (!d3.event.active) forceSim.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      
      function dragging (d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
      
      function dragEnd (d) {
        if (!d3.event.active) forceSim.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
}
if (document.getElementById('vis')) {
        $.ajax({
        type : 'POST',
        url: "http://localhost:8000/api/user",
        contentType: "text/plain",
        success: function(response){
                // Activity Visualiztion
                response=response.result.activity
                var width = 960,
                height = 136,
                cellSize = 17;

                var formatPercent = d3.format(".1%");

                var color = d3.scaleQuantize()
                .domain(response.domain)
                .range(["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"]);

                var svg = d3.select("#vis")
                .selectAll("svg")
                .data(response.years)
                .enter().append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

                svg.append("text")
                .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("text-anchor", "middle")
                .text(function(d) { return d; });

                daily = response.daily
                var rect = svg.append("g")
                .attr("fill", "none")
                .attr("stroke", "#ccc")
                .selectAll("rect")
                .data(function(d) { return d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
                .enter().append("rect")
                .attr("width", cellSize)
                .attr("height", cellSize)
                .attr("x", function(d) { return d3.timeWeek.count(d3.timeYear(d), d) * cellSize; })
                .attr("y", function(d) { return d.getDay() * cellSize; })
                .on("click",function(d){
                        if( d in daily){
                                var temp_data = []
                                Object.keys(daily[d]).forEach(function(tag){
                                        temp_data.push({"label":tag, "value":daily[d][tag]});
                                })
                                tagsvis(temp_data,d);
                        }
                        else{
                                alert("No tags are recorded on "+d + ".\nThe following dates have entries: \n"+ Object.keys(daily));
                        }
                        d3.event.stopPropagation();
                })
                .datum(d3.timeFormat("%Y-%m-%d"));

                svg.append("g")
                .attr("fill", "none")
                .attr("stroke", "#000")
                .selectAll("path")
                .data(function(d) { return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
                .enter().append("path")
                .attr("d", pathMonth);

                heat = response.heat
                rect.filter(function(d) { return d in heat; })
                .attr("fill", function(d) { return color(heat[d]); })
                .append("title")
                .text(function(d) { return d + ": " + heat[d]+" Activities Recorded" });


                function pathMonth(t0) {
                var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
                d0 = t0.getDay(), w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
                d1 = t1.getDay(), w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
                return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
                + "H" + w0 * cellSize + "V" + 7 * cellSize
                + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
                + "H" + (w1 + 1) * cellSize + "V" + 0
                + "H" + (w0 + 1) * cellSize + "Z";
                }
                
                // Tags Visualization
                var fst_date = Object.keys(daily)[0];
                var fst_temp = [];
                Object.keys(daily[fst_date]).forEach(function(tag){
                                        fst_temp.push({"label":tag, "value":daily[fst_date][tag]});
                                })
                tagsvis(fst_temp,fst_date);
                //Social
                pie_data1 = {
                        size: {
                                canvasHeight: 500,
                                canvasWidth: 500
                        },
                        header: {
                                title: {
                                        text: ""
                                }
                        },
                        data: {
                                content: []
                        },
                        "tooltips": {
                                "enabled": true,
                                "type": "placeholder",
                                "string": "{label}: {value}, {percentage}%"
                        },
                        "effects": {
                                "pullOutSegmentOnClick": {
                                        "effect": "linear",
                                        "speed": 400,
                                        "size": 8
                                }
                        }
                }

                pie_data1["data"]["content"] = response.social
                var pie1 = new d3pie("social", pie_data1);
                
                //Successful queries
                var tooltip = d3.select("body")
                .append("div")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("visibility", "hidden")
                .style("background", "lightsteelblue")
                .style("font","12px sans-serif")
                .style("border","0px")
                .style("border-radius","8px")
                .html("<strong>Success tags</strong><br>"+
                response.success['pass'] +
                "<br><br><strong>Failure tags</strong><br>" +  response.success['fail'])

                d3.select("#success").call(drawCircularProgressBar, response.success);
                function fix(k) {
                var t0, t1 = k * 2 * Math.PI;

                // Solve for theta numerically.
                if (k > 0 && k < 1) {
                        t1 = Math.pow(12 * k * Math.PI, 1 / 3);
                        for (var i = 0; i < 10; ++i) {
                                t0 = t1;
                                t1 = (Math.sin(t0) - t0 * Math.cos(t0) + 2 * k * Math.PI) / (1 - Math.cos(t0));
                        }
                        k = (1 - Math.cos(t1 / 2)) / 2;
                }
                return k;
                }
                
                function drawCircularProgressBar(selection, success) {
                if (selection) {
                        var r = 120;       // radius of the ball

                        var h = 0;
                        var zero = 0;
                        var one = 0;
                        var text = "N/A";
                        var k = success['val']
                        if (k >= 0) {
                        var fixed = fix(k);
                        h = r * 2 * (1 - fixed);
                        zero = 1;
                        one = k;
                        text = parseInt(k * 100) + "%";
                        }
                        selection.selectAll("svg").remove();
                        selection.append("svg").attr("width", "330px").attr("height", "300px")
                        .attr("viewBox", "0 0 " + r*2 + " " + r*2)
                        .call(function(e) {
                                var defs = e.append("defs")
                                var clip = defs.append("clipPath").attr("id", "clip")
                                .append("rect").attr("x", "-" + r).attr("y", "-" + r)
                                .attr("width", r*2).attr("height", h);
                        g = e.append("g").attr("transform", "translate(" + r + "," + r + ")");
                        g.append("circle").attr("r", r).attr("class", "na");
                        g.append("circle").attr("r", r).style("fill-opacity", zero).attr("class", "zero");
                        g.append("circle").attr("r", r).style("fill-opacity", one).attr("class", "one");
                        g.append("circle").attr("r", r).style("fill", "#333").style("fill-opacity", 0.5).attr("clip-path", "url(#clip)"),	
                        g.append("text").attr("class", "value").attr("text-anchor", "middle").attr("font-size", "100").style("fill", "white").style("fill-opacity", .7).text(text);
                        })
                        .on("mouseover", function(){return tooltip.style("visibility", "visible");})
                        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
                        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
                }
                }	
        },
        });

 }
function tagsvis(data,date) {
        $('#tags svg').remove();
        $('#tag_data').html("Time spent on each tags on "+date)
        pie_data = {
                size: { 
                        canvasHeight: 500,
                        canvasWidth: 500
                },
                header: {
                        title: {
                                text: ""
                        }
                },
                data: {
                        content: []
                },
                "tooltips": {
                        "enabled": true,
                        "type": "placeholder",
                        "string": "{label}: {value}, {percentage}%"
                },
                "effects": {
                        "pullOutSegmentOnClick": {
                                "effect": "linear",
                                "speed": 400,
                                "size": 8
                        }
                }
        }
        pie_data["data"]["content"] = data

        var pie = new d3pie("tags", pie_data);
}
