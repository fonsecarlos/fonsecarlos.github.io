var map;
	function initialize() {
		var mapOptions = {
			scrollwheel: false
		};
		map = new google.maps.Map(document.getElementById('contato'),
			mapOptions);
		var bounds = new google.maps.LatLngBounds();    
	  // Try HTML5 geolocation
	  if(navigator.geolocation) {
	  	navigator.geolocation.getCurrentPosition(function(position) {
	  		var pos = new google.maps.Marker({
	  			position: new google.maps.LatLng(position.coords.latitude,
	  				position.coords.longitude), map: map
	  		});
	  		var cefet = new google.maps.Marker({
	  			position: new google.maps.LatLng(-19.939186,
	  				-43.998840), map: map
	  		});
	  //extend the bounds to include each marker's position
	  bounds.extend(pos.position);   
	  bounds.extend(cefet.position); 
	  map.fitBounds(bounds);
	  map.setZoom(15);
	}, function() {
		handleNoGeolocation(true);
	});
	  } else {
	    // Browser doesn't support Geolocation
	    handleNoGeolocation(false);
	}
	}
	function handleNoGeolocation(errorFlag) {
		if (errorFlag) {
			var content = 'Error: The Geolocation service failed.';
		} else {
			var content = 'Error: Your browser doesn\'t support geolocation.';
		}
		var options = {
			map: map,
			position: new google.maps.LatLng(60, 105),
			content: content
		};
		var infowindow = new google.maps.InfoWindow(options);
		map.setCenter(options.position);
	}
	google.maps.event.addDomListener(window, 'load', initialize);