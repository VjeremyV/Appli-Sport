import daysArray from "./Utils/timeFunction.js";

const APIKEY = "e7dd8e91bc26852d6be93a8f680ae076";
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");
const hour = document.querySelectorAll(".hour-name-forecast");
const weatherForEachHour = document.querySelectorAll(".hour-forecast-value");
const daysWeek = document.querySelectorAll(".day-forecast-name");
const daysWeather = document.querySelectorAll(".day-forecast-weather");
const imgIcon = document.querySelector(".logo-weather");
const loading = document.querySelector(".overlay-icon-loading");
const quotation = document.querySelector(".quotation");
const author = document.querySelector('.author');
let resultApi;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      callAPI(long, lat);
    },
    () => {
      alert("vous avez refusé la géolocalisation, veuillez l'activer !");
    }
  );
}

function callAPI(long, lat) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${APIKEY}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      resultApi = data;
      console.log(data);
      weather.innerText = resultApi.current.weather[0].description;
      temperature.innerText = `${Math.round(resultApi.current.temp)}°`;
      localisation.innerText = resultApi.timezone;

      let currentHour = new Date().getHours();

      for (let i = 0; i < hour.length; i++) {
        let hourIncr = currentHour + i * 3;

        if (hourIncr > 24) {
          hour[i].innerText = `${hourIncr - 24} h`;
        } else if (hourIncr == 24) {
          hour[i].innerText = `00 h`;
        } else {
          hour[i].innerText = `${hourIncr} h`;
        }
      }

      for (let j = 0; j < weatherForEachHour.length; j++) {
        weatherForEachHour[j].innerText = `${Math.round(
          resultApi.hourly[j * 3].temp
        )}°`;
      }

      for (let k = 0; k < daysArray.length; k++) {
        daysWeek[k].innerText = daysArray[k].slice(0, 3);
      }

      for (let m = 0; m < 7; m++) {
        daysWeather[m].innerText = `${Math.round(
          resultApi.daily[m + 1].temp.day
        )}°`;
      }

      if (currentHour >= 6 && currentHour <= 20) {
        imgIcon.src = `./ressources/jour/${resultApi.current.weather[0].icon}.svg`;
      } else {
        imgIcon.src = `./ressources/nuit/${resultApi.current.weather[0].icon}.svg`;
      }
    });

  fetch(`https://api.quotable.io/random`)
    .then((res) => {
      return res.json();
    })
    .then((dataQ) => {quotation.innerText = dataQ.content;
    author.innerText = dataQ.author})
  .then(() => {loading.classList.add("hidden")});
}
