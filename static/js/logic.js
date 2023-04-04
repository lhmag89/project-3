d3.json('/data_table').then(function(data1){
	// Get subject ID's and populate the dropdown
    
    for (let i=0; i<data1.length; i++){
        let dropdownList = d3.select("#selDataset");
		let geoID=data1[i][7];
		dropdownList.append("option").text(geoID);
		console.log(geoID);
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
		console.log(tractColor);
		console.log(vulScore);

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