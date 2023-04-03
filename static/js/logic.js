d3.json('http://localhost:5000/data').then(function(data){
	
// Starting point. The center of California
	var myMap=L.map("map", {
	    center: [37.595794, -121.889489],
	    zoom: 15,
	})

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

//Adds the ploygons to the map. 
		L.polygon(change_order_of_cords, {color: 'blue'}).addTo(myMap);
	};
});