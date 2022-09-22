# Module-14-Challenge | Belly Button Biodiversity
In this assignment, you will build an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.


## The setup: Use the D3 library to read 
![Capture](https://user-images.githubusercontent.com/30300016/191866272-c0419133-d1c1-4caf-97e6-a81e940d1806.JPG)


## Horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual. 
  ### Display the sample metadata, i.e., an individual's demographic information.
  ### Display each key-value pair from the metadata JSON object somewhere on the page.
  
![Capture01](https://user-images.githubusercontent.com/30300016/191864480-e4ec9ca6-2c92-46a5-891e-c8b2568698f2.JPG)

    function buildDropdown(names) {
        var dropDown = d3.select("#selDataset");
        var options = dropDown.selectAll("option")
            .data(names)
            .enter()
            .append("option")
            .text(d => d)
            .attr("value", d => d);
    }

    function optionChanged(sampleId) {
        let sample = sampleData.samples.find(s => s.id == sampleId);
        let metadata = sampleData.metadata.find(s => s.id == sampleId);
        console.log(sample, metadata);

        displaySample(sample, metadata);
    }

    const mapRange = (OldMin, OldMax, NewMin, NewMax, OldValue) => (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin;

    function createColor(sampleValue) {
        let hue = Math.floor(mapRange(min, max, 0, 360, sampleValue));
        return `hsl(${hue},100,40)`;
    }

    function createMetadata(metadata) {
        var div = d3.select("#sample-metadata");
        div.html('');

        div.append('p').text(`id: ${metadata.id}`);
        div.append('p').text(`ethnicity: ${metadata.ethnicity}`);
        div.append('p').text(`gender: ${metadata.gender}`);
        div.append('p').text(`age: ${metadata.age}`);
        div.append('p').text(`location: ${metadata.location}`);
        div.append('p').text(`bbtype: ${metadata.bbtype}`);
        div.append('p').text(`wfreq: ${metadata.wfreq}`);
    }

    function displaySample(sample, metadata) {
        createBarGraph(sample);
        createBubbleChart(sample);
        createMetadata(metadata);
        createGauge(metadata);
    }
### Horizontal bar chart 
    function createBarGraph(sample) {
              var layout = {
                  autosize: false,
                  width: 400,
                  //height: 500,
                  yaxis: {autorange: 'reversed'}
                  // margin: {
                  //     l: 50,
                  //     r: 50,
                  //     b: 100,
                  //     t: 100,
                  //     pad: 4
                  // },
                  // paper_bgcolor: '#7f7f7f',
                  // plot_bgcolor: '#c7c7c7'
              };
              var data = [{
                  type: 'bar',
                  x: sample.sample_values.slice(0,10),
                  y: sample.otu_ids.slice(0,10).map((i) => `OTU ${i}`),
                  text: sample.otu_labels.slice(0,10),
                  orientation: 'h'
                }];

                Plotly.newPlot('bar', data, layout);
          }



## Bubble chart that displays each sample.
![Capture03](https://user-images.githubusercontent.com/30300016/191864797-d9f6ce83-9068-4fcb-9f0e-402dda9084da.JPG)

    function createBubbleChart(sample) {
    var trace1 = {
        x: sample.otu_ids,
        y: sample.sample_values,
        text: sample.otu_labels,
        mode: 'markers',
        marker: {
          color: sample.otu_ids.map(createColor),
          size: sample.sample_values
        }
      };
      
      var data = [trace1];
      
      var layout = {
        //title: 'OTU ',
        showlegend: false,
        autosize: true,
        height: 600,
        xaxis: {
            title: {
                text: 'OTU ID'
            }
        },
        //width: 600
      };
      
      Plotly.newPlot('bubble', data, layout);
      }



## Advanced Challenge Assignment (Optional)
  ### Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot the weekly washing frequency of the individual.
  ![Capture04](https://user-images.githubusercontent.com/30300016/191865395-4234521f-5564-4eb0-8449-e9d5d35d6c39.JPG)
  
        function createGauge(metadata) {
    var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: metadata.wfreq,
          title: { text: "Belly Jelly Weekly Clean" },
          type: "indicator",
          mode: "gauge+number",
          //delta: { reference: 380 },
          gauge: {
            borderwidth: 0,
            axis: {
                range: [0, 9],
                ticks: "",
                //ticklen: 10,
                tickmode: 'array',
                tickvals: [.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5],
                ticktext: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
                
            },
            steps: [
              { name: '0-1', range: [0, 1], color: "#F7DC6F" },
              { range: [1, 2], color: "#82E0AA" },
              { range: [2, 3], color: "#7DCEA0" },
              { range: [3, 4], color: "#73C6B6" },
              { range: [4, 5], color: "#76D7C4" },

              { range: [5, 6], color: "#85C1E9" },
              { range: [6, 7], color: "#7FB3D5" },
              { range: [7, 8], color: "#BB8FCE" },
              { range: [8, 9], color: "#C39BD3" },
            ],
            // threshold: {
            //   line: { color: "red", width: 4 },
            //   thickness: 0.75,
            //   value: 490
            // }
          }
        }
      ];
    var theta = 93.5
    var r = 0.7
    var x_head = r * Math.cos(Math.PI/180*theta)
    var y_head = r * Math.sin(Math.PI/180*theta)

    var layout = {
        width: 600,
        height: 450,
        margin: { t: 0, b: 0 },
        annotation: {
            ax: 0.5,
            ay: 0,
            axref: 'x',
            ayref: 'y',
            x: 0.5+x_head,
            y: y_head,
            xref: 'x',
            yref: 'y',
            showarrow: true,
            arrowhead: 9,
        }
    };
    
    Plotly.newPlot('gauge', data, layout);
    }

## Update all the plots when a new sample is selected
![Capture05](https://user-images.githubusercontent.com/30300016/191865692-7ab472ba-87e1-412f-a898-c37d45e17b62.JPG)


