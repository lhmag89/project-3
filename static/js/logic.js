
d3.json('/data_table').then(function(data1){
	// Get GEOID's and populate the dropdown
    
    for (let i=0; i<data1.length; i++){
        let dropdownList = d3.select("#selDataset");
		let geoID=data1[i][7];
		dropdownList.append("option").text(geoID);
        };
 
});

// Add data column names to dropdown
let columns = ["Social Vulnerability Score", "Mean Household Income", "Percent Under Poverty Line",
				"Per Capita Income", "Percent No HS Diploma"];
for (let i=0; i<columns.length; i++){
	let dropdownListx = d3.select("#selDatasetx");
	let dropdownListy = d3.select("#selDatasety");
	let columnLabel=columns[i];
	dropdownListx.append("option").text(columnLabel);
	dropdownListy.append("option").text(columnLabel);
};
//Call data
d3.json('http://localhost:5000/data').then(function(data){
	
// Starting point. The center of Alameda
	var myMap=L.map("map", {
	    center: [37.595794, -121.889489],
	    zoom: 10,
	});

//grabs out tiles
	var streetMap=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
	streetMap.addTo(myMap);

//iterates tbrough our data to create the poloygons
	for (let i=0; i<data.length; i++){
		let data_block=data[i][0];
		let change_order_of_cords=[];
		for (let j=0; j<data_block.length; j++){
			let coordinate=data_block[j];
			change_order_of_cords.push([coordinate[1], coordinate[0]]);
		};
		function getColor(d) {
			return d > 0.8  ? 'red' :
				   d > 0.6  ? 'orange' :
				   d > 0.4  ? 'yellow' :
				   d > 0.2  ? 'green' :
							  'darkgreen';
		};
		d3.json('/data_table').then(function(data1){
		let vulScore = data1[i][1];
		let tractColor = getColor(vulScore);

//Adds the ploygons to the map with Popups. 
		L.polygon(change_order_of_cords, {color: tractColor}).bindPopup(`<h3>GEOID: ${data1[i][7]}</h3><h5>Tract: ${data1[i][8]}</h5><hr><p>Social Vulnerability Score: ${data1[i][1]}</p>
		<p>% Below Poverty: ${data1[i][4]}</p><p>% No High School Diploma: ${data1[i][6]}</p><p>Mean Household Income: ${data1[i][2]}</p>
		<p>Per Capita Income: ${data1[i][5]}</p>`).addTo(myMap);});
	};
	// Create and add the legend
	const legend = L.control({position: 'topright'});

	legend.onAdd = function (x) {

		const div = L.DomUtil.create('div', 'info legend');
		const grades = [0, 0.2, 0.4, 0.6, 0.8];
		const labels = [];
		labels.push('Least Vulnerable');
		let from, to;

		for (let i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];
      function getColor(d) {
        return  d > 0.8  ? 'red' :
				d > 0.6  ? 'orange' :
			    d > 0.4  ? 'yellow' :
			    d > 0.2  ? 'green' :
							  'darkgreen';
    };
			labels.push(`<i style="background:${getColor(from + .01)}"></i> ${from}${to ? `&ndash;${to} Social Vulnerability` : '+ Social Vulnerability'}`);
			
		}
		labels.push('Most Vulnerable');

		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(myMap);
});
// Store data in lists and create hover values in a list
d3.json('/data_table').then(function(data1){
	var vScore = [];
	var householdIncome= [];
	var poverty = [];
	var perCapita= [];
	var noHSDiploma = [];
	var geoID = [];
	var text = [];
	for (let i=0; i<data1.length; i++){
		let vulScore = data1[i][1];
   		let meanIncome = data1[i][2];
		let percentPoverty = data1[i][4];
		let perCapitaIncome = data1[i][5];
	 	let percentNoHS = data1[i][6];
		let geoidentity = data1[i][7];
		let hover = `GEOID: ${data1[i][7]}`;
		householdIncome.push(meanIncome);	
		vScore.push(vulScore);
		poverty.push(percentPoverty);
		perCapita.push(perCapitaIncome);	
		noHSDiploma.push(percentNoHS);	
		geoID.push(geoidentity);
		text.push(hover);
	
	};
	// Set initial conditions for Scatterplot
	var yInfo = [vScore, columns[0], [0, 1]]
	var xInfo = [poverty, columns[2], [0, 1]]
	var xData = xInfo[0];
    var xLabel = xInfo[1];
    var xRange = xInfo[2];
    var yData = yInfo[0];
    var yLabel = yInfo[1];
    var yRange = yInfo[2];

	var dataScatter = [{
		x: xData,
		y: yData,
		mode: 'markers',
		type: 'scatter',
		text: text
	  }];

	  var layout ={
		title: 'Alameda County Data (2020)',
		xaxis: {
			title: xLabel,
			range: xRange
		},
		yaxis: {
			title: yLabel,
			range: yRange
		},
		mode: 'markers',
		type: 'scatter',
		marker: {
			color: 'blue',
			size: 10
		}
	};

	Plotly.newPlot('scatter', dataScatter, layout);
   
	// Call updateView() when a change takes place to the DOM
   d3.selectAll("#selDatasetx").on("change", updateView);
   d3.selectAll("#selDatasety").on("change", updateView); 
   // Create function that updates the views when new selection is made from the dropdown
   function updateView() {
    let columns = ["Social Vulnerability Score", "Mean Household Income", "Percent Under Poverty Line",
				"Per Capita Income", "Percent No HS Diploma"];
    let dropdownListx = d3.select("#selDatasetx");
	let dropdownListy = d3.select("#selDatasety");
     // Get current values on dropdowns
     let selectedx = dropdownListx.property("value");
     let selectedy = dropdownListy.property("value");
     // Get info for x-axis
	 function getDataX(selection) {
        return selection === columns[1]  ? [householdIncome, columns[1], [0, 270000]]:
               selection === columns[2]  ? [poverty, columns[2], [0, 1]]:
               selection === columns[3]  ? [perCapita, columns[3], [0, 175000]]:
               selection === columns[4]  ? [noHSDiploma, columns[4], [0, 1]]:
                                            [vScore, columns[0], [0, 1]];
    };
	// Get info for y-axis
    function getDataY(selection) {
        return selection === columns[1]  ? [householdIncome, columns[1], [0, 270000]]:
               selection === columns[2]  ? [poverty, columns[2], [0, 1]]:
               selection === columns[3]  ? [perCapita, columns[3], [0, 175000]]:
               selection === columns[4]  ? [noHSDiploma, columns[4], [0, 1]]:
                                            [vScore, columns[0], [0, 1]];
    };
	// update scatterplot and plot
    xData = getDataX(selectedx)[0];
    xLabel = getDataX(selectedx)[1];
    xRange = getDataX(selectedx)[2];
    yData = getDataY(selectedy)[0];
    yLabel = getDataY(selectedy)[1];
    yRange = getDataY(selectedy)[2];

    var dataScatter = [{
		x: xData,
		y: yData,
		mode: 'markers',
		type: 'scatter',
		text: text
	  }];

	var layout ={
		title: 'Alameda County Data (2020)',
		xaxis: {
			title: xLabel,
			range: xRange
		},
		yaxis: {
			title: yLabel,
			range: yRange
		},
		mode: 'markers',
		type: 'scatter',
		marker: {
			color: 'blue',
			size: 10
		}
	};

	Plotly.newPlot('scatter', dataScatter, layout);
     };
	 // Create Bar chart for tract with initial data
	 var chart = new CanvasJS.Chart("chartContainer", {
        title:{
            text: `Tract ${geoID[0]} Summary`          
        },
		axisY:{
			minimum: 0,
			maximum: 1,
			interval: 0.1,
			}   ,
        data: [              
        {
            type: "column",
            dataPoints: [
                { label: "Vulnerability Score",  y: vScore[0]},
                { label: "% Below Poverty Line", y: poverty[0]},
                { label: "% No HS Diploma", y: noHSDiploma[0]}
            ]
        }
        ]
    });
    chart.render();
	// Call updateView() when a change takes place to the DOM
	d3.selectAll("#selDataset").on("change", updateBars);

	// Create function that updates the views when new selection is made from the dropdown
	function updateBars() {
 	let dropdownList = d3.select("#selDataset");
  	// Get current value on dropdown
  	var selectedGeo = dropdownList.property("value");
  	// Function to check GEOID and grab data for that tract 
	function getGeoInfo(checkID) {
  		for (let i = 0; i < geoID.length; i++) {
    		if  (geoID[i] == checkID) {
        		console.log(checkID)
				return [vScore[i], poverty[i], noHSDiploma[i], `Tract ${geoID[i]} Summary`];
      		}
   		}
	}
	// Update the bar chart based on dropdown's GEOID
    var chart = new CanvasJS.Chart("chartContainer", {
        title:{
            text: getGeoInfo(selectedGeo)[3]             
        },
		axisY:{
			minimum: 0,
			maximum: 1,
			interval: 0.1,
			},
        data: [              
        {
            type: "column",
            dataPoints: [
                { label: "Vulnerability Score",  y: getGeoInfo(selectedGeo)[0]},
                { label: "% Below Poverty Line", y: getGeoInfo(selectedGeo)[1]},
                { label: "% No HS Diploma", y: getGeoInfo(selectedGeo)[2]}
            ]
        }
        ]})
		chart.render();
    };
	
    
}

).catch(function(error){
	console.log(error);
	
});   