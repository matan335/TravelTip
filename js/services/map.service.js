
var map;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    return _connectGoogleApi()
    .then(() => {
        console.log('google available');
        map = new google.maps.Map(
            document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            }

        )
        document.querySelector('#map').style.width="95%"
        document.querySelector('#map').style.margin="0 auto"
    })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    return marker;
}

function centerMap(lat, lng) {
    map.setCenter({lat:lat, lng:lng});
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyActt80vPu4ZZsNrMOoNRVRT5cx6WLvxJY ';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);
    
    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
        // elGoogleApi.onerror = reject.bind(null,'Google script failed to load')
    })
}

export default {
    initMap,
    addMarker,
    centerMap
}

