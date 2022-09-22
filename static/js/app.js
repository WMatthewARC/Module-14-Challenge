const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

let sampleData;
let min, max;

d3.json(url).then(function(data) {
    console.log(data);
    sampleData = data;
    min = Math.min(...data.samples[0].otu_ids);
    max = Math.max(...data.samples[0].otu_ids);

    buildDropdown(data.names);
    displaySample(data.samples[0], data.metadata[0]);
});

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

    // let arr = Object.entries(metadata);
    // for(var i=0; i<arr.length; i++) {
    //     div.append('p').text(`${arr[i][0]}: ${arr[i][1]}`);
    // }
    
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
    //createGauge(sample);
}

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

/*
Use otu_ids for the x values.
Use sample_values for the y values.
Use sample_values for the marker size.
Use otu_ids for the marker colors.
Use otu_labels for the text values.
*/
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