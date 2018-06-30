console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather.service.js'




locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    mapService.initMap()
        .then(
            () => {

                // mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
            }
        ).catch(console.warn);



    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            let lat = pos.coords.latitude
            let lng = pos.coords.longitude
            let position = { lat: lat, lng: lng }
            locService.codeLatLng(lat, lng)
            mapService.addMarker(position);
            mapService.centerMap(lat, lng)
            weatherService._connectWeaterApi(lat, lng)

        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

document.querySelector('.btn1').onclick = () => {
    console.log('Thanks!');
}


document.querySelector('.btn1').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
})


document.querySelector('#myForm').addEventListener('submit', function (e) {
    debugger;
    let input = document.querySelector('.my-input')
    let value = input.value;
    console.log('input is:', value)

    //TODO get geocoder api
    //TODO get wheather api
    var searchBox = new google.maps.places.SearchBox(input)
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);


    e.preventDefault();
}, false);

document.querySelector('.my-location').addEventListener('click', (ev) => {
    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            debugger;
            let lat = pos.coords.latitude
            let lng = pos.coords.longitude
            let position = { lat: lat, lng: lng }
            locService.codeLatLng(lat, lng)
            mapService.addMarker(position);
            mapService.centerMap(lat, lng)
            weatherService._connectWeaterApi(lat, lng)

        })

})


