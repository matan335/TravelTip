
function _connectWeaterApi(lat, lng) {
    const weatherKey = '8233b3e7a2782879208fb2d8bc97f60f'
    var prm = fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${weatherKey}&units=metric`);
    return prm.then(function (res) {
        var prmJ = res.json();
        return prmJ.then(function (weatherdata) {
            let elWeather=document.querySelector('.weather')
            let weatherDesc = weatherdata.weather[0].description
            let weatherIcon = weatherdata.weather[0].icon
            let iconImg = `<img src="http://openweathermap.org/img/w/${weatherIcon}.png">`
            let weatherText=`<div class="wather-container">${weatherDesc}<div>`
            elWeather.innerHTML=weatherText+iconImg

            return weatherdata

        })
    })
}

export default {
    _connectWeaterApi
}