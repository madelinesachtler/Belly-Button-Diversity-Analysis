d3.json("samples.json").then((data)=> {
    var dropdown = d3.select("#selDataset")
    data.names.forEach((ids)=> {
        dropdown.append("option").text(ids).property("value", ids)
    })
    allcharts(data.names[0])
})
function optionChanged(selectedid){
    allcharts(selectedid)
}

function allcharts(id){
console.log(id)
// need to filter for top 10 found in the person 
d3.json("samples.json").then((data)=> {

    var filtereddata = data.samples.filter(sample => sample.id == id)
    console.log(filtereddata)

    filtereddata = filtereddata[0]



    // trace for the top 10 samples 
    var trace1 = {
        type: "bar", 
        x: filtereddata.sample_values.slice(0,10).reverse(), 
        y: filtereddata.otu_ids.map(o => "OTU " + o).slice(0,10).reverse(), 
        text: filtereddata.otu_labels.slice(0,10).reverse(), 
        orientation: 'h'
    }; 
    //data 
 var chartdata = [trace1]; 


Plotly.newPlot("bar", chartdata)

// bubble plot 

    var trace2= {
        x: filtereddata.otu_ids, 
        y: filtereddata.sample_values, 
        mode: "markers", 
        marker: {
            size : filtereddata.sample_values, 
            color : filtereddata.otu_ids
        }
    }; 

    var chartdata2 = [trace2]; 

    var layout = {
        title: "Bubble Chart", 
        showlegend : true, 

    }; 

Plotly.newPlot('bubble', chartdata2, layout)

var filtereddata = data.metadata.filter(sample => sample.id == id)
console.log(filtereddata)

var demographics = d3.select("#sample-metadata")
demographics.html("")
Object.entries(filtereddata[0]).forEach(([key,values])=> {
    demographics.append("h5").text(key + ": " + values)
}) 

})

};