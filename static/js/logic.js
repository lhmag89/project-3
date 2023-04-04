d3.json('/data_table').then(function(data1){
	// Get subject ID's and populate the dropdown
    
    for (let i=0; i<data1.length; i++){
        let dropdownListx = d3.select("#selDatasetx");
		let dropdownListy = d3.select("#selDatasety");
		let geoID=data1[i][7];
		dropdownListx.append("option").text(geoID);
		dropdownListy.append("option").text(geoID);
        };
 
});   
d3.json('http://localhost:5000/data').then(function(data){
	
// Starting point. The center of California
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

//Adds the ploygons to the map. 
		L.polygon(change_order_of_cords, {color: tractColor}).bindPopup(`<h3>GEOID: ${data1[i][7]}</h3><h5>Tract: ${data1[i][8]}</h5><hr><p>Social Vulnerability Score: ${data1[i][1]}</p>
		<p>% Below Poverty: ${data1[i][4]}</p><p>% No High School Diploma: ${data1[i][6]}</p><p>Mean Household Income: ${data1[i][2]}</p>
		<p>Per Capita Income: ${data1[i][5]}</p>`).addTo(myMap);});
	};
	// Create and add the legend
	const legend = L.control({position: 'bottomright'});

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



var options = {
  type: 'bubble',
  data: {
    datasets: [
      {
        label: 'Water Vulnerability Score',
        data: [
          {
            x: 3,
            y: 7,
            r: 40
          }
        ],
        backgroundColor:"#ff6384",
        hoverBackgroundColor: "#ff6384"
      }
      ]
  }
}

var ctx = document.getElementById('chartJSContainer').getContext('2d');
new Chart(ctx, options);




d3.json('/data_table').then(function(data1){
	var x = [];
	var y = [];
	var text = [];
	for (let i=0; i<data1.length; i++){
		let vulScore = data1[i][1];
   		let meanIncome = data1[i][2];
		let hover = `GEOID: ${data1[i][7]}`;
		x.push(
			meanIncome
		);	
		y.push(
			vulScore
		);
		console.log(vulScore, meanIncome);
		text.push(
			hover
		);
	
	};

	var dataScatter = [{
		x: x,
		y: y,
		mode: 'markers',
		type: 'scatter',
		text: text
	  }];

	var layout ={
		title: 'Scatter Plot',
		xaxis: {
			title: 'Mean Household Income',
			range: [0, 200000]
		},
		yaxis: {
			title: 'Social Vulnerability Score',
			range: [0, 1]
		},
		mode: 'markers',
		type: 'scatter',
		marker: {
			color: 'blue',
			size: 10
		}
	};

	Plotly.newPlot('scatter', dataScatter, layout);

}).catch(function(error){
	console.log(error);
	
var optionsTwo = {
  type: 'bar',
  data: {
    //labels: ["Label1", "Label2"],
    labels: ["the labels"],
    datasets: [{
      data: [45000],
      label: "Label 1",
      backgroundColor: "#3e95cd",

    }, {
      data: [40000],
      label: "Label 2",
      backgroundColor: "#8e5ea2",

    }, ]
  },
  options: {

    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontColor: 'rgb(0, 0, 0)'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
}
var ctxOne = document.getElementById('bar-chart').getContext('2d');
new Chart(ctxOne, optionsTwo);

});   