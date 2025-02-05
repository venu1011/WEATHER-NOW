function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}


const apiKey = "6209e99edbb0095b3140a2ba2f30d024";
async function getWeather() {
    const city = document.getElementById("city-input").value;
    if (!city) return;
    
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        const forecastResponse = await fetch(forecastUrl);
        
        if (!weatherResponse.ok || !forecastResponse.ok) {
            throw new Error("City not found");
        }
        
        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();
        
        document.getElementById("city-name").textContent = weatherData.name;
        document.getElementById("temperature").textContent = `${weatherData.main.temp}°C`;
        document.getElementById("condition").textContent = `Condition: ${weatherData.weather[0].description}`;
        document.getElementById("humidity").textContent = `Humidity: ${weatherData.main.humidity}%`;
        document.getElementById("wind-speed").textContent = `Wind Speed: ${weatherData.wind.speed} km/h`;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
        
        document.getElementById("sunrise").textContent = `Sunrise: ${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}`;
        document.getElementById("sunset").textContent = `Sunset: ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}`;

        updateForecast(forecastData);
    } catch (error) {
        alert(error.message);
    }
}

function updateForecast(forecastData) {
    const forecastContainer = document.getElementById("forecast-data");
    forecastContainer.innerHTML = "";
    
    for (let i = 0; i < forecastData.list.length; i += 8) {
        const dayData = forecastData.list[i];
        const forecastElement = document.createElement("div");
        forecastElement.classList.add("forecast-item");
        forecastElement.innerHTML = `
            <p>${new Date(dayData.dt * 1000).toDateString()}</p>
            <img src="https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png" alt="Weather Icon">
            <p>${dayData.main.temp}°C</p>
        `;
        forecastContainer.appendChild(forecastElement);
    }
}
