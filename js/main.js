console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather.service.js'




locService.getLocs()
window.onload = () => {
    mapService.initMap()
        .then(
            () => {

                // mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
            }
        ).catch(console.warn);



    locService.getPosition()
        .then(pos => {
            let lat = pos.coords.latitude
            let lng = pos.coords.longitude
            let position = { lat: lat, lng: lng }
            locService.getLocationName(lat, lng)
            mapService.addMarker(position);
            mapService.centerMap(lat, lng)
            weatherService._connectWeaterApi(lat, lng)

        })
        .catch(err => {
            console.log('err!!!', err);
        })
}


document.querySelector('#myForm').addEventListener('submit', function (e) {
    let input = document.querySelector('.my-input')
    let value = input.value;
    let prmPos = locService.locationByString(value)
    prmPos.then(function () {

        // mapService.addMarker(prmPos)
        // document.querySelector('#map').setCenter(prmPos);
    })

    e.preventDefault();
}, false);

document.querySelector('.my-location').addEventListener('click', (ev) => {
    locService.getPosition()
        .then(pos => {
            let lat = pos.coords.latitude
            let lng = pos.coords.longitude
            let position = { lat: lat, lng: lng }
            locService.getLocationName(lat, lng)
            mapService.addMarker(position);
            mapService.centerMap(lat, lng)
            weatherService._connectWeaterApi(lat, lng)

        })

})
document.querySelector('.send-my-location').addEventListener('click', (ev) => {
    try {

        locService.getPosition()
            .then(pos => {
                let lat = pos.coords.latitude
                let lng = pos.coords.longitude
                var dummy = document.createElement('textarea');
                document.body.appendChild(dummy);
                dummy.value = `https://matan335.github.io/TravelTip//index.html?lat=${lat}&lng=${lng}`
                dummy.select();
                document.execCommand("copy");
                console.log('copyed')
                // document.body.removeChild(dummy);

            })
    } catch{
        console.log('Try again');

    }
})

