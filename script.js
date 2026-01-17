const apiKey = "af209e8251ea3e048f3a55fff6bd9460"; // Replace with your OpenWeatherMap API key
const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

getWeatherBtn.addEventListener("click", () => {
    const cityName = cityInput.value.trim();
    if (cityName === "") {
        alert("Please enter a city name");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    .then(response => {
        if (!response.ok) throw new Error("City not found");
        return response.json();
    })
    .then(data => {
        const { name, main, weather } = data;
        weatherResult.innerHTML = `
            <h2>${name}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Weather: ${weather[0].main}</p>
        `;
    })
    .catch(err => {
        weatherResult.innerHTML = `<p style="color:red">${err.message}</p>`;
    });
});
