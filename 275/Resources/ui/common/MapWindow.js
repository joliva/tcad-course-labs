var map = function(person) {
	var win = Ti.UI.createWindow();

	var annotation = Ti.Map.createAnnotation({
	    	latitude:person.capturedLat,
	    	longitude:person.capturedLon,
			title: person.title,
			animate: true,
			pincolor: Ti.Map.ANNOTATION_RED
	});
	
	if (person.url !== '') {
		var f = Ti.Filesystem.getFile(person.url);
		//annotations[0].image = f.read();
	}
	
	var mapView = Titanium.Map.createView({
	    mapType: Titanium.Map.STANDARD_TYPE,
	    region: {
	    	latitude:person.capturedLat,
	    	longitude:person.capturedLon,
			latitudeDelta:0.1,
			longitudeDelta:0.1
		},
	    animate:true,
	    regionFit:true,
	    userLocation:false,
	});
	
	mapView.addAnnotation(annotation);

	win.add(mapView);
	return win;
};

module.exports = map;