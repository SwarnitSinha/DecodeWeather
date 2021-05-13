const weather = {
    temperature: {
        value: 18,
        unit: "celsius"
    },
    description: "few clouds",
    city: "London",
    country: "GB",
    wind: "",
    humid: "",
    pressure :"",
    feels_like : ""
};




const API = '&appid=755e7c483900eddc49ee3dc467328649';
const rawUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
var unit = '&units=metric';

var searchBtn = document.getElementById("searchBtn");

var form = document.getElementById("form");

// from preventing reload of page
form.addEventListener('submit', handleForm);
function handleForm(event) { event.preventDefault(); }


var recentSearch = new Array();

searchBtn.addEventListener("click", function () {
    const city = document.getElementById("searchedCity").value;

    recentSearch.unshift(city);

    document.getElementById("searchedCity").value = "";

    displayImage();
    searchedData();
    displayRecent();
});

function displayRecent() {
    var firstRecent = document.querySelector('.recentSearch .firstRecent');
    var secondRecent = document.querySelector('.recentSearch .secondRecent');

    firstRecent.innerHTML = recentSearch[0].trim().toUpperCase();
    if (recentSearch[1] != null) {
        secondRecent.innerHTML = recentSearch[1].trim().toUpperCase() ;
    }

}

function searchedData() {

    var url = rawUrl + recentSearch[0] + API + unit;

    fetch(url).then(res => {
        var data = res.json();
        return data;
    }).then(function (data) {
        weather.temperature.value = Math.floor(data.main.temp);
        weather.description = data.weather[0].description;
        weather.city = data.name;
        weather.country = data.sys.country;

        weather.wind = data.wind.speed;
        weather.humid =data.main.humidity;
        weather.pressure =data.main.pressure;
        weather.feels_like =data.main.feels_like;
        // console.log(weather.humid)
        // console.log(weather.pressure)
        // console.log(weather.feels_like)
        

    }).then(function () {
        displayImage();
    });

}


function displayWeather() {
    
    // description

    document.querySelector('.desc').innerHTML = weather.description.toLocaleUpperCase();
    // temp
    document.querySelector('.temp').innerHTML = weather.temperature.value + "°C";

    
    // location
    document.querySelector('.location').innerHTML = weather.city + ", " + weather.country;


    // wind
    document.querySelector('.wind').innerHTML = "Wind : " + weather.wind + " m/s";
    //humid
    document.querySelector('.humid').innerHTML = "Humidity : " + weather.humid + "%";
    //pressure
    document.querySelector('.pressure').innerHTML = "Pressure : " + weather.pressure +" hPa";
    //precipitation
    document.querySelector('.feelsLike').innerHTML = "Feels Like : " + weather.feels_like +"°C";
}
function displayImage(){
    let imgUrl = "https://source.unsplash.com/user/erondu/500x500?" + weather.city +"," + weather.description;
    let img = document.getElementById("changeImg");
    img.setAttribute("src",imgUrl);
    let tempelate = document.querySelector('.weatherInfo');
    // document.tempelate.style.backgroundImage = "url('imgUrl')";
    // displayWeather();
    img.addEventListener("DOMContentLoaded",displayWeather());
}