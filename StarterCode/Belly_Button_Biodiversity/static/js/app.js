function buildMetadata(sample) {
  
  // @TODO: Complete the following function that builds the metadata panel
  var URL = "/metadata/" + sample;
  // console.log(URL);
// use d3 to fetch the metadata for a sample
  d3.json(URL).then((data) =>{
    var panel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    panel.html("");

    Object.entries(data).forEach(([key, value]) => {
      var paragraph = panel.append("p");
      paragraph.text(`${key} : ${value}`);
    });
  });

}





function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
    var pieChart = d3.select("#pie")
    var bubbleChart = d3.select("#bubble")
    var url = "/samples/" + sample;
    // @TODO: Build a Bubble Chart using the sample data
    d3.json(url).then(function(data) {
      var sValues = data.sample_values;
      var sLabels = data.otu_ids;
      var sText = data.otu_labels;

      var trace1 = {
        x: sLabels,
        y: sValues,
        mode: 'markers',
        text: sText,
        marker: {
          color: sLabels,
          size: sValues
        },
        type: 'scatter'
      };

      var bubbledata = [trace1];
      var layout = {
        xaxis: { title: "OTU ID"},
      };

    Plotly.newPlot("bubble", bubbledata, layout);




      

    // });



    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    //buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  //buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
