const form = document.querySelector("form");
const input = document.querySelector("#city-input");

const API_Key = "58a3957e6fd580a062d3604639cd6daa";

window.addEventListener("load", renderCurrentUserLocationWeather);
form.addEventListener("submit", handleForecast);

function handleForecast(e) {
  e.preventDefault();
  const inputUserCity = input.value;

  // openWeatherMapTodayGet(city, API_Key);
}

function renderCurrentUserLocationWeather() {
  let lat, lon;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      openWeatherMapNextDaysGet(lat, lon, API_Key)
        .then(city => {
          displayWeather(city.name, API_Key);
        })
        .catch((error) => console.error(error));
    });
  } else {
    displayWeather("Nova Iguaçu", API_Key);
  }
}

function displayWeather(city, API_Key) {
  openWeatherMapTodayGet(city, API_Key)
    .then(userCity => {
      const cityNameEl = document.querySelector("#city-name");
      const currentTemperatureEl = document.querySelector("#current-temperature");
      const currentMaxTemperatureEl = document.querySelector(".numbers .max-temperature");
      const currentMinTemperatureEl = document.querySelector(".numbers .min-temperature");
      const currentWindEl = document.querySelector("#wind");
      const currentHumidityEl = document.querySelector("#humidity");
      const currentRainEl = document.querySelector("#rain");
      
      const todayIconEl = document.querySelector("#weather-img");

      cityNameEl.textContent = userCity.name;     
      currentTemperatureEl.textContent = userCity.today.temp; 
      currentMaxTemperatureEl.textContent = userCity.today.maxTemp; 
      currentMinTemperatureEl.textContent = userCity.today.minTemp; 
      currentWindEl.textContent = userCity.today.wind; 
      currentHumidityEl.textContent = userCity.today.humidity; 
      currentRainEl.textContent = userCity.today.rain;

      todayIconEl.setAttribute("src", `./src/assets/imgs/${userCity.today.weather}-img.svg`);
      todayIconEl.setAttribute("alt", `Imagem representando o tempo: ${userCity.today.description}.`);

      openWeatherMapNextDaysGet(userCity.lat, userCity.lon, API_Key)
        .then(userCity => {
          // Weekdays

          const firstDayEl = document.querySelector("#week-section .week-card:nth-child(1) .text"); 
          const secondDayEl = document.querySelector("#week-section .week-card:nth-child(2) .text");
          const thirdDayEl = document.querySelector("#week-section .week-card:nth-child(3) .text");
          const fourthDayEl = document.querySelector("#week-section .week-card:nth-child(4) .text");
          const fifthDayEl = document.querySelector("#week-section .week-card:nth-child(5) .text");
          
          firstDayEl.textContent = userCity.nextDaysWeather[1].weekday;
          secondDayEl.textContent = userCity.nextDaysWeather[2].weekday;
          thirdDayEl.textContent = userCity.nextDaysWeather[3].weekday;
          fourthDayEl.textContent = userCity.nextDaysWeather[4].weekday;
          fifthDayEl.textContent = userCity.nextDaysWeather[5].weekday;
          
          // MaxTemp

          const firstDayMaxTempEl = document.querySelector("#week-section .week-card:nth-child(1) .max-temperature");
          const secondDayMaxTempEl = document.querySelector("#week-section .week-card:nth-child(2) .max-temperature");
          const thirdDayMaxTempEl = document.querySelector("#week-section .week-card:nth-child(3) .max-temperature");
          const fourthDayMaxTempEl = document.querySelector("#week-section .week-card:nth-child(4) .max-temperature");
          const fifthDayMaxTempEl = document.querySelector("#week-section .week-card:nth-child(5) .max-temperature");

          firstDayMaxTempEl.textContent = userCity.nextDaysWeather[1].maxTemp + "°";
          secondDayMaxTempEl.textContent = userCity.nextDaysWeather[2].maxTemp + "°";
          thirdDayMaxTempEl.textContent = userCity.nextDaysWeather[3].maxTemp + "°";
          fourthDayMaxTempEl.textContent = userCity.nextDaysWeather[4].maxTemp + "°";
          fifthDayMaxTempEl.textContent = userCity.nextDaysWeather[5].maxTemp + "°";
          
          // MinTemp

          const firstDayMinTempEl = document.querySelector("#week-section .week-card:nth-child(1) .min-temperature");
          const secondDayMinTempEl = document.querySelector("#week-section .week-card:nth-child(2) .min-temperature");
          const thirdDayMinTempEl = document.querySelector("#week-section .week-card:nth-child(3) .min-temperature");
          const fourthDayMinTempEl = document.querySelector("#week-section .week-card:nth-child(4) .min-temperature");
          const fifthDayMinTempEl = document.querySelector("#week-section .week-card:nth-child(5) .min-temperature");

          firstDayMinTempEl.textContent = userCity.nextDaysWeather[1].minTemp + "°";
          secondDayMinTempEl.textContent = userCity.nextDaysWeather[2].minTemp + "°";
          thirdDayMinTempEl.textContent = userCity.nextDaysWeather[3].minTemp + "°";
          fourthDayMinTempEl.textContent = userCity.nextDaysWeather[4].minTemp + "°";
          fifthDayMinTempEl.textContent = userCity.nextDaysWeather[5].minTemp + "°";

          // Icons

          const firstDayIconEl = document.querySelector("#week-section .week-card:nth-child(1) img");
          const secondDayIconEl = document.querySelector("#week-section .week-card:nth-child(2) img");
          const thirdDayIconEl = document.querySelector("#week-section .week-card:nth-child(3) img");
          const fourthDayIconEl = document.querySelector("#week-section .week-card:nth-child(4) img");
          const fifthDayIconEl = document.querySelector("#week-section .week-card:nth-child(5) img");

          firstDayIconEl.setAttribute("src", `./src/assets/imgs/${userCity.nextDaysWeather[1].weather}-img.svg`);
          firstDayIconEl.setAttribute("alt", `Imagem representando ${userCity.nextDaysWeather[1].description}.`);
          
          secondDayIconEl.setAttribute("src", `./src/assets/imgs/${userCity.nextDaysWeather[2].weather}-img.svg`);
          secondDayIconEl.setAttribute("alt", `Imagem representando ${userCity.nextDaysWeather[2].description}.`);

          thirdDayIconEl.setAttribute("src", `./src/assets/imgs/${userCity.nextDaysWeather[3].weather}-img.svg`);
          thirdDayIconEl.setAttribute("alt", `Imagem representando ${userCity.nextDaysWeather[3].description}.`);

          fourthDayIconEl.setAttribute("src", `./src/assets/imgs/${userCity.nextDaysWeather[4].weather}-img.svg`);
          fourthDayIconEl.setAttribute("alt", `Imagem representando ${userCity.nextDaysWeather[4].description}.`);

          fifthDayIconEl.setAttribute("src", `./src/assets/imgs/${userCity.nextDaysWeather[5].weather}-img.svg`);
          fifthDayIconEl.setAttribute("alt", `Imagem representando ${userCity.nextDaysWeather[5].description}.`);
          
        })
        .catch(error => console.log("Next Days Forecast Error:", error));
    })
    .catch(error => console.error("Today Forecast Error: ", error));
}

async function openWeatherMapTodayGet(city, API_Key) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric&lang=pt_br`
  );
  const data = await response.json();

  console.log("today:", data);

  const name = data.name;
  const lat = data.coord.lat;
  const lon = data.coord.lon;

  const today = {
    weather: data.weather[0].main,
    temp: data.main.temp.toFixed(0),
    maxTemp: data.main.temp_max.toFixed(0) + "°",
    minTemp: data.main.temp_min.toFixed(0) + "°",
    wind: (data.wind.speed * 3.6).toFixed(0), // passei de m/s para km/h com o "* 3.6"
    humidity: data.main.humidity.toFixed(0),
    rain: data.rain ? data.rain["1h"] : 0, // em alguns casos o rain não aparece, e nesses é 0%, então se tiver vai dar a porcentagem, mas se n, é pq é 0, então é 0
    description: data.weather[0].description
  }

  return {
    name,
    lat,
    lon,
    today
  };
}

async function openWeatherMapNextDaysGet(lat, lon, API_Key) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_Key}&units=metric&lang=pt_br`
  );
  const data = await response.json();

  console.log("next days:", data);

  // for(let i = 0; i < data.list.length; i++) {
  //   console.log(data.list[i].weather[0].main);
  // }

  function generateWeekdays() {
    const weekdays = new Array(6);
    const options = {
      weekday: "long",
      timeZone: "UTC",
    };

    for (let i = 0; i < weekdays.length; i++) {
      weekdays[i] = new Date();
      weekdays[i].setDate(weekdays[i].getDate() + i);
      weekdays[i] = weekdays[i].toLocaleDateString("pt-br", options); // Transformando em dia da semana por extenso
      weekdays[i] = weekdays[i].charAt(0).toUpperCase() + weekdays[i].slice(1); // Pondo a primeira letra em maiúsculo e concatenando com o restante da palavra
    }

    return weekdays;
  }

  function ElementData(num) {
    let maxTemp, minTemp, weather, description;

    for (let i = 0; i < data.list.length; i++) {
      const hour = data.list[i].dt_txt.slice(11);

      // A partir de 00:00:00 começa o dia seguinte. Posso pegar então os dados desse dia com a condicional para isso
      if (hour === "00:00:00") { 
        maxTemp = data.list[i + num*8].main.temp_max.toFixed(0);
        minTemp = data.list[i + num*8].main.temp_min.toFixed(0);
        weather = data.list[i + num*8].weather[0].main;
        description = data.list[i + num*8].weather[0].description;
        break;
      }
    }

    return {
      maxTemp,
      minTemp,
      weather,
      description
    };
  }

  const element_1 = ElementData(0);
  const element_2 = ElementData(1);
  const element_3 = ElementData(2);
  const element_4 = ElementData(3);
  const element_5 = ElementData(4);

  function ElementConstructor(weekday, maxTemp, minTemp, weather, description) {
    this.weekday = weekday,
    this.maxTemp = maxTemp,
    this.minTemp = minTemp,
    this.weather = weather,
    this.description = description
  }

  const elements = {
    name: data.city.name,
    nextDaysWeather: {
      1: new ElementConstructor("Amanhã", element_1.maxTemp, element_1.minTemp, element_1.weather, element_1.description),
      2: new ElementConstructor(generateWeekdays()[2], element_2.maxTemp, element_2.minTemp, element_2.weather, element_2.description),
      3: new ElementConstructor(generateWeekdays()[3], element_3.maxTemp, element_3.minTemp, element_3.weather, element_3.description),
      4: new ElementConstructor(generateWeekdays()[4], element_4.maxTemp, element_4.minTemp, element_4.weather, element_4.description),
      5: new ElementConstructor(generateWeekdays()[5], element_5.maxTemp, element_5.minTemp, element_5.weather, element_5.description)
    }
  };

  console.log("elements:", elements)

  return elements;
}
