import mapService from './map.service.js'
import weatherService from './weather.service.js'


var locs = [{ lat: 11.22, lng: 22.11 }]
function getLocs1() {
    return Promise.resolve(locs);
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });

}


function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function getSearchedPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function getLocationName(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            document.querySelector('.location-name').innerText = 'Location:' + results[1].formatted_address

            if (results[1]) {
                //find country name
                for (var i = 0; i < results[0].address_components.length; i++) {
                    for (var b = 0; b < results[0].address_components[i].types.length; b++) {

                        //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                        if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                            //this is the object you are looking for
                            var city = results[0].address_components[i];
                            break;
                        }
                    }
                }

            } else {
                document.querySelector('.location-name').innerText = "No results found"
            }
        } else {
            document.querySelector('.location-name').innerText = "Geocoder failed due to: " + status
        }
    });
}

function locationByString(address) {
    const locApi_key = 'AIzaSyBUPOD44lhuNIREJESycpuEth_nQgadAgU'
    var prm = fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${locApi_key}`);
    return prm.then(function (res) {
        var prmJ = res.json();
        return prmJ.then(function (locationData) {
            let location = {lat:locationData.results[0].geometry.location.lat,
                lng:locationData.results[0].geometry.location.lng}

            mapService.addMarker(location)
            mapService.centerMap(location.lat,location.lng);
            weatherService._connectWeaterApi(location.lat,location.lng)
            getLocationName(location.lat,location.lng)

            return location;

        })
    })

}

export default {
    getLocs,
    getPosition,
    getLocationName,
    locationByString
}