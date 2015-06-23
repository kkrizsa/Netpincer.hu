var geocoder;
var map;
//window.onload = function(){
//	var geocodeButton = document.getElementById("geocode");
//	geocodeButton.onclick = codeAddress;
//};
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(47.4925, 19.0514);
  var mapOptions = {
    zoom: 11,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function addInfoWindow(marker, data, count) {
			
            var infoWindow = new google.maps.InfoWindow({
                content: "<p>"+"Shop name: "+data.Sheet1[count].shopName+"</br>"+
						"GMV: "+data.Sheet1[count].gmv+"</br>"+
						"Lunch GMV 11-15: "+data.Sheet1[count]['Gmv 11-15']+"</br>"+
						"Dinner GMV 17-23: "+data.Sheet1[count]['Gmv 17-23']+"</p>"
            });
            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(map, marker);
            });
        }

function geocodeAddress(address, data, count) {
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var result = results[0].geometry.location;
            var marker = new google.maps.Marker({
                position: result,
                map: map
            });
			addInfoWindow(marker, data, count);
        } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {    
            setTimeout(function() {
                geocodeAddress(address, data, count);
            }, 200);
        } else {
            alert("Geocode was not successful for the following reason:" 
                  + status);
        }
    });
}

function mark(geo, data, count){
	var geos = geo.trim().split(',');
	//console.log("first: "+geos[0]+" second: "+geos[1]);
	var myLatlng = new google.maps.LatLng(geos[0], geos[1]);
	
	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map
	});
	addInfoWindow(marker, data, count);
}

google.maps.event.addDomListener(window, 'load', initialize);

