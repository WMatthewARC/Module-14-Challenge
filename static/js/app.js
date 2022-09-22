const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data.samples[0]);
    console.log(data.samples[0].sample_values.slice(0,10))
    createBarGraph(data.samples[0]);
});

function createBarGraph(sample) {
    var layout = {
        autosize: false,
        width: 500,
        height: 500,
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
        //text: sample.otu_labels.slice(0,10)
        orientation: 'h'
      }];
      
      Plotly.newPlot('bar', data, layout);
}
