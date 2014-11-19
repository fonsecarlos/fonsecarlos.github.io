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

	
  request = {
      origin: (latitude + ',' + longitude),
      destination: '-19.893063,-43.9384724',
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
      zoom: 17,
      center: location,
	scrollwheel: false
    };
    map = new google.maps.Map(document.getElementById('contato'), mapOptions);
	
    map.disableScrollWheelZoom();
    directionsDisplay.setMap(map);
	
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
