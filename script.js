// ------------------ DOM Elements ------------------
const apiKey = "af209e8251ea3e048f3a55fff6bd9460"; // <-- Add your OpenWeatherMap API key here
const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const dateDay = document.getElementById("dateDay");

const placesList = document.querySelector("#famousPlaces ul");
const hospitalList = document.querySelector("#govHospitals ul");

// ------------------ City Data ------------------
const cityData = {
  pune: {
    places: ["Shaniwar Wada", "Sinhagad Fort", "Aga Khan Palace"],
    hospitals: ["Sassoon Hospital", "Aundh Civil Hospital"]
  },
  mumbai: {
    places: ["Gateway of India", "Marine Drive", "Juhu Beach"],
    hospitals: ["JJ Hospital", "KEM Hospital", "Nair Hospital"]
  },
  delhi: {
    places: ["India Gate", "Red Fort", "Qutub Minar"],
    hospitals: ["AIIMS Delhi", "Safdarjung Hospital"]
  },
  nagpur: {
    places: ["Futala Lake", "Deekshabhoomi", "Sitabuldi Fort"],
    hospitals: ["Government Medical College Nagpur", "Orange City Hospital"]
  },
  kamptee: {
    places: ["Kamptee Cantonment", "Shukrawari Lake"],
    hospitals: ["Kamptee Civil Hospital"]
  },
  ramtek: {
    places: ["Ramtek Fort", "Ramtek Temple"],
    hospitals: ["Ramtek Hospital"]
  },
  amravati: {
    places: ["Melghat Tiger Reserve", "Shivaji Garden"],
    hospitals: ["Government Medical College Amravati"]
  },
  haryana: {
    places: ["Kurukshetra", "Sultanpur National Park"],
    hospitals: ["PGIMS Rohtak"]
  },
  aurangabad: {
    places: ["Ajanta Caves", "Bibi Ka Maqbara"],
    hospitals: ["Aurangabad Civil Hospital"]
  },
  nagzira: {
    places: ["Nagzira Wildlife Sanctuary"],
    hospitals: ["Nagzira Hospital"]
  }
};

// ------------------ Update Date & Time ------------------
function updateTime() {
  const now = new Date();
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];

  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2,'0');

  dateDay.innerText = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} ${hours}:${minutes}`;
}

setInterval(updateTime, 1000);
updateTime();

// ------------------ Weather Fetch ------------------
getWeatherBtn.addEventListener("click", () => {
  const cityName = cityInput.value.trim().toLowerCase();
  if (cityName === "") {
    alert("Please enter a city name");
    return;
  }

  // Fetch Weather
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const { name, main, weather } = data;
      weatherResult.innerHTML = `
        <h3>${name}</h3>
        <p>Temperature: ${main.temp}°C🌡</p>
        <p>Humidity: ${main.humidity}%🌨</p>
        <p>Weather: ${weather[0].main}⛅️</p>
      `;
    })
    .catch(error => {
      weatherResult.innerHTML = `<p style="color:red">${error.message}</p>`;
    });

  // Show City Info
  showCityInfo(cityName);
});

// ------------------ Show City Info ------------------
function showCityInfo(city) {
  const data = cityData[city];

  placesList.innerHTML = "";
  hospitalList.innerHTML = "";

  if (!data) {
    placesList.innerHTML = "<li>No data available</li>";
    hospitalList.innerHTML = "<li>No data available</li>";
    return;
  }

  data.places.forEach(place => {
    placesList.innerHTML += `<li>${place}</li>`;
  });

  data.hospitals.forEach(hospital => {
    hospitalList.innerHTML += `<li>${hospital}</li>`;
  });
}
