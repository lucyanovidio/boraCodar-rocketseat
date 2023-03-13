const form = document.querySelector("form");
const input = document.querySelector("#city-input");

const API_Key = "58a3957e6fd580a062d3604639cd6daa";

form.addEventListener("submit", handleForecast);

async function handleForecast(e) {
    e.preventDefault();
    const city = input.value;

    openWeatherMapGet(city, API_Key);
}

function openWeatherMapGet(city, API_Key) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric&lang=pt_br`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error("Deu erro:", error));
}