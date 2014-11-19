var Digital=new Date()
var hours=Digital.getHours()




var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function renderMap() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var location = new google.maps.LatLng(-19.843063,-43.9384724);
  var mapOptions = {
    zoom: 17,
    center: location,
	scrollwheel: false
  };
  map = new google.maps.Map(document.getElementById('contato'), mapOptions);
  directionsDisplay.setMap(map);
}

function calcRoute(latitude, longitude) {
  var today = new Date();
  var request;
	var dest;
  if (hours>=5&&hours<=11) //MESSAGE FOR MORNING
	dest = '-19.843063,-43.9384724';
	else if (hours==12) //MESSAGE FOR NOON
	dest = '-19.843063,-43.9384724';
	else if (hours>=13&&hours<=17) //MESSAGE FOR AFTERNOON
	dest = '-19.843063,-43.9384724';
	else if (hours>=18&&hours<=20) //MESSAGE FOR EVENING (6pm-8pm)
	dest = '-18.843063,-43.9384724';
	else if (hours>=21&&hours<=11) //MESSAGE FOR NIGHT (9pm-11pm)
	dest = '-18.843063,-43.9384724';
	else //MESSAGE FOR LATE NIGHT, EARLY MORNING (12pm-4am)
	dest = '-19.843063,-43.9384724';

	
  request = {
      origin: (latitude + ',' + longitude),
      destination: dest,
      travelMode: google.maps.TravelMode.DRIVING
  };
  
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

function renderGeolocationMap() {
  navigator.geolocation.getCurrentPosition(function(position) {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
      zoom: 100,
      center: location,
	scrollwheel: false
    };
    map = new google.maps.Map(document.getElementById('contato'), mapOptions);
	
    directionsDisplay.setMap(map);
	
    map.disableScrollWheelZoom();
    calcRoute(position.coords.latitude, position.coords.longitude);
  });
}

function initialize() {
  renderMap();
  if ("geolocation" in navigator) {
    renderGeolocationMap();
  } else {
    renderMap();
  }
}
google.maps.event.addDomListener(window, 'load', initialize);
